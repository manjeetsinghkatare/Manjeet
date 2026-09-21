using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Collections.Generic;

public class FaviconBuilder
{
    public static Bitmap RenderIcon(Bitmap srcImg, int size, int cropCenterX, int cropCenterY, int cropSize, bool isAppleTouch)
    {
        Bitmap bmp = new Bitmap(size, size, PixelFormat.Format32bppArgb);
        using (Graphics g = Graphics.FromImage(bmp))
        {
            g.SmoothingMode = SmoothingMode.AntiAlias;
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
            g.PixelOffsetMode = PixelOffsetMode.HighQuality;
            g.CompositingQuality = CompositingQuality.HighQuality;
            g.Clear(Color.Transparent);

            Rectangle srcRect = new Rectangle(cropCenterX - (cropSize / 2), cropCenterY - (cropSize / 2), cropSize, cropSize);

            if (isAppleTouch)
            {
                // Apple Touch icon: 180x180 solid dark square (iOS automatically applies squircle mask)
                using (SolidBrush bg = new SolidBrush(Color.FromArgb(255, 11, 15, 25)))
                {
                    g.FillRectangle(bg, 0, 0, size, size);
                }
                // Subtle blue accent border
                using (Pen rim = new Pen(Color.FromArgb(160, 59, 130, 246), 4.0f))
                {
                    g.DrawRectangle(rim, 2, 2, size - 4, size - 4);
                }
                // Draw logo with 18% padding
                int margin = (int)(size * 0.16);
                Rectangle destRect = new Rectangle(margin, margin, size - (margin * 2), size - (margin * 2));
                g.DrawImage(srcImg, destRect, srcRect, GraphicsUnit.Pixel);
            }
            else
            {
                // Standard browser favicon: circular dark disc matching site branding
                float pad = Math.Max(0.5f, size * 0.02f);
                RectangleF rf = new RectangleF(pad, pad, size - (pad * 2), size - (pad * 2));

                using (SolidBrush bg = new SolidBrush(Color.FromArgb(255, 11, 15, 25))) // #0b0f19
                using (Pen rim = new Pen(Color.FromArgb(200, 59, 130, 246), Math.Max(1.0f, size * 0.045f))) // #3b82f6
                {
                    g.FillEllipse(bg, rf);
                    g.DrawEllipse(rim, rf);
                }

                // Draw centered M logo
                // For 16px, give 1px padding; for 32px, 2px padding; etc.
                int margin = (size <= 16) ? 1 : (size <= 32) ? 2 : (int)Math.Round(size * 0.08);
                Rectangle destRect = new Rectangle(margin, margin, size - (margin * 2), size - (margin * 2));
                g.DrawImage(srcImg, destRect, srcRect, GraphicsUnit.Pixel);
            }
        }
        return bmp;
    }

    public static void CreateIco(List<byte[]> pngs, int[] sizes, string outIcoPath)
    {
        using (FileStream fs = new FileStream(outIcoPath, FileMode.Create))
        using (BinaryWriter bw = new BinaryWriter(fs))
        {
            // ICONDIR
            bw.Write((ushort)0); // Reserved
            bw.Write((ushort)1); // Type 1 = ICO
            bw.Write((ushort)pngs.Count); // Image count

            int offset = 6 + (16 * pngs.Count);

            for (int i = 0; i < pngs.Count; i++)
            {
                int s = sizes[i];
                bw.Write((byte)(s >= 256 ? 0 : s)); // Width
                bw.Write((byte)(s >= 256 ? 0 : s)); // Height
                bw.Write((byte)0); // Color count
                bw.Write((byte)0); // Reserved
                bw.Write((ushort)1); // Color planes
                bw.Write((ushort)32); // Bits per pixel
                bw.Write((uint)pngs[i].Length); // Size in bytes
                bw.Write((uint)offset); // Offset in file

                offset += pngs[i].Length;
            }

            for (int i = 0; i < pngs.Count; i++)
            {
                bw.Write(pngs[i]);
            }
        }
    }
}
