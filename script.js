// Add any JavaScript functionality here if needed

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('calligraphyCanvas');
    const colorPicker = document.getElementById('colorPicker');
    const brushSize = document.getElementById('brushSize');
    const saveButton = document.getElementById('saveButton');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let drawing = false;

        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.6;

        ctx.lineWidth = brushSize.value;
        ctx.lineCap = 'round';
        ctx.strokeStyle = colorPicker.value;

        function getMousePos(canvas, evt) {
            const rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }

        function startDrawing(e) {
            drawing = true;
            draw(e);
        }

        function endDrawing() {
            drawing = false;
            ctx.beginPath();
        }

        function draw(e) {
            if (!drawing) return;
            const pos = getMousePos(canvas, e);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
        }

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('mousemove', draw);

        canvas.addEventListener('touchstart', (e) => startDrawing(e.touches[0]));
        canvas.addEventListener('touchend', endDrawing);
        canvas.addEventListener('touchmove', (e) => draw(e.touches[0]));

        colorPicker.addEventListener('input', () => {
            ctx.strokeStyle = colorPicker.value;
        });

        brushSize.addEventListener('input', () => {
            ctx.lineWidth = brushSize.value;
        });

        saveButton.addEventListener('click', () => {
            const link = document.createElement('a');
            link.download = 'calligraphy.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    }
});
