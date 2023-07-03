import useManagerStore from "@/stores/manager";
import useZoomStore from "@/stores/zoom";
import React, { useEffect, useRef } from "react";

const ParticipantsGrid = () => {
  const client = useZoomStore((s) => s.client);
  const stream = useManagerStore((s) => s.stream);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const participants = client?.getAllUser();
    if (!canvas || !participants || !stream) return;

    const draw = () => {
      const context = canvas.getContext("2d");
      const grid_size = Math.ceil(Math.sqrt(participants.length || 0)); // Calculate the number of rows/columns
      const video_width = (canvas.width || 0) / grid_size; // Calculate the width of each video
      const video_height = (canvas.height || 0) / grid_size; // Calculate the height of each video

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      participants.forEach(async (participant, i) => {
        const row = Math.floor(i / grid_size);
        const col = i % grid_size;

        // Render the video on the canvas
        const x = col * video_width;
        const y = row * video_height;

        if (participant.bVideoOn) {
          const result = await stream.renderVideo(
            canvas,
            participant.userId,
            video_width,
            video_height,
            x,
            y,
            3
          );

          if (result instanceof Error) {
            console.error(
              `Failed to render video for user ${participant.userId}:`,
              result
            );
          }
        } else {
          if (!context) return;
          // Render the participant's username in the middle of the cell
          context.font = "20px Arial"; // Adjust as needed
          // change color to white
          context.fillStyle = "#ffffff";
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.fillText(
            participant.userIdentity || "Unknown",
            x + video_width / 2,
            y + video_height / 2
          );
        }
      });

      requestAnimationFrame(draw); // Continue drawing
    };

    draw();
  }, [client, stream]);

  return <canvas ref={canvasRef} id="participants-grid" />;
};

export default ParticipantsGrid;
