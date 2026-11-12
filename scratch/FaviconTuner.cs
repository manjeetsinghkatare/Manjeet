using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;

public class FaviconTuner
{
    public static Bitmap RenderRoundedSquare(Bitmap srcImg, int size, float logoScaleRatio)
    {
        Bitmap bmp = new Bitmap(size, size, PixelFormat.Format32bppArgb);
        using (Graphics g = Graphics.FromImage(bmp))
        {
            g.SmoothingMode = SmoothingMode.AntiAlias;
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
            g.PixelOffsetMode = PixelOffsetMode.HighQuality;
            g.CompositingQuality = CompositingQuality.HighQuality;
            g.Clear(Color.Transparent);

            // 1. Draw solid black rounded square
            // Corner radius: ~22% of size (standard modern squircle / iOS icon radius)
            float radius = (size <= 16) ? 3.0f : (size <= 32) ? 6.0f : size * 0.22f;
            using (GraphicsPath path = new GraphicsPath())
            {
                float d = radius * 2;
                RectangleF rf = new RectangleF(0, 0, size, size);
                path.AddArc(rf.X, rf.Y, d, d, 180, 90);
                path.AddArc(rf.Right - d, rf.Y, d, d, 270, 90);
                path.AddArc(rf.Right - d, rf.Bottom - d, d, d, 0, 90);
                path.AddArc(rf.X, rf.Bottom - d, d, d, 90, 90);
                path.CloseFigure();

                using (SolidBrush bgBrush = new SolidBrush(Color.FromArgb(255, 0, 0, 0))) // Pure solid black
                {
                    g.FillPath(bgBrush, path);
                }
            }

            // 2. Draw centered M logo
            // M logo in srcImg has center at (632, 652).
            // Height = 712, Width = 656.
            // When scaled, target height = size * logoScaleRatio.
            // Target width = target height * (656.0f / 712.0f)
            float targetH = size * logoScaleRatio;
            float targetW = targetH * (656.0f / 712.0f);
            float destX = (size - targetW) / 2.0f;
            float destY = (size - targetH) / 2.0f;

            Rectangle srcRect = new Rectangle(304, 296, 656, 712);
            RectangleF destRect = new RectangleF(destX, destY, targetW, targetH);

            g.DrawImage(srcImg, destRect, srcRect, GraphicsUnit.Pixel);
        }
        return bmp;
    }
}
