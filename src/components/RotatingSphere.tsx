import { useEffect, useRef } from 'react';

export default function RotatingSphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;

    // Define vertices of a 3D Icosahedron
    const t = (1.0 + Math.sqrt(5.0)) / 2.0; // Golden ratio
    const vertices: [number, number, number][] = [
      [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
      [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
      [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
    ];

    // Normalize vertices to make it a perfect sphere of radius 100
    const scaleFactor = 100;
    const points = vertices.map(v => {
      const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      return [
        (v[0] / len) * scaleFactor,
        (v[1] / len) * scaleFactor,
        (v[2] / len) * scaleFactor
      ] as [number, number, number];
    });

    // Connections (indices of points that should be connected by wires)
    const edges: [number, number][] = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        // In an icosahedron, distance between connected vertices is constant.
        // Let's connect any vertices whose distance is close to the minimum distance.
        const dx = points[i][0] - points[j][0];
        const dy = points[i][1] - points[j][1];
        const dz = points[i][2] - points[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 125) { // Threshold for icosahedron edge length
          edges.push([i, j]);
        }
      }
    }

    let angleX = 0.005;
    let angleY = 0.008;

    // Handle resizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width || 300;
        height = entry.contentRect.height || 300;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.styleMedia = `${height}px`;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    });
    resizeObserver.observe(canvas);

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Rotate points
      const rotatedPoints = points.map(p => {
        // Rotate X
        let y1 = p[1] * Math.cos(angleX) - p[2] * Math.sin(angleX);
        let z1 = p[1] * Math.sin(angleX) + p[2] * Math.cos(angleX);

        // Rotate Y
        let x2 = p[0] * Math.cos(angleY) - z1 * Math.sin(angleY);
        let z2 = p[0] * Math.sin(angleY) + z1 * Math.cos(angleY);

        return [x2, y1, z2] as [number, number, number];
      });

      // Update rotation angles over time
      angleX += 0.003;
      angleY += 0.004;

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw glowing aura behind the sphere
      const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, scaleFactor * 1.5);
      gradient.addColorStop(0, 'rgba(124, 58, 237, 0.15)');
      gradient.addColorStop(0.6, 'rgba(124, 58, 237, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, scaleFactor * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Draw edges
      ctx.lineWidth = 1.2;
      edges.forEach(([i, j]) => {
        const p1 = rotatedPoints[i];
        const p2 = rotatedPoints[j];

        // Simple 3D to 2D perspective projection
        const fov = 300;
        const zOff = 250; // Camera distance

        const scale1 = fov / (fov + p1[2]);
        const scale2 = fov / (fov + p2[2]);

        const x1 = centerX + p1[0] * scale1;
        const y1 = centerY + p1[1] * scale1;
        const x2 = centerX + p2[0] * scale2;
        const y2 = centerY + p2[1] * scale2;

        // Calculate opacity based on depth (z-coordinate) to give real 3D feeling
        const averageZ = (p1[2] + p2[2]) / 2;
        const opacity = Math.max(0.1, Math.min(0.8, 0.5 - averageZ / (scaleFactor * 2)));

        ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      // Draw vertices
      rotatedPoints.forEach((p) => {
        const fov = 300;
        const scale = fov / (fov + p[2]);
        const x = centerX + p[0] * scale;
        const y = centerY + p[1] * scale;

        const opacity = Math.max(0.1, Math.min(1.0, 0.6 - p[2] / (scaleFactor * 2)));

        ctx.fillStyle = `rgba(0, 245, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, 3 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Draw sub-millimeter data points ring
        if (opacity > 0.6) {
          ctx.strokeStyle = `rgba(0, 245, 255, ${opacity * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(x, y, 6 * scale, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block', touchAction: 'none' }}
    />
  );
}
