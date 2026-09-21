Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\manje\OneDrive\Desktop\Manjeet PROMPT\assets\images\branding\m_monogram_color.png"
$srcImg = [System.Drawing.Bitmap]::FromFile($srcPath)

# Content bounds: CenterX = 632, CenterY = 652. Crop size = 960x960
$cropSize = 960
$cropX = [int](632 - ($cropSize / 2))
$cropY = [int](652 - ($cropSize / 2))
$srcRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropSize, $cropSize)

function Create-Favicon($outPath, $size, $shape, $hasBorder) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    $rect = New-Object System.Drawing.RectangleF(0.5, 0.5, $size - 1, $size - 1)
    $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 11, 15, 25)) # #0b0f19
    $rimPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 59, 130, 246), [Math]::Max(1.0, $size * 0.04)) # #3b82f6

    if ($shape -eq "circle") {
        $g.FillEllipse($bgBrush, $rect)
        if ($hasBorder) {
            $g.DrawEllipse($rimPen, $rect)
        }
    } elseif ($shape -eq "squircle") {
        $radius = $size * 0.22
        $path = New-Object System.Drawing.Drawing2D.GraphicsPath
        $d = $radius * 2
        $path.AddArc($rect.X, $rect.Y, $d, $d, 180, 90)
        $path.AddArc($rect.Right - $d, $rect.Y, $d, $d, 270, 90)
        $path.AddArc($rect.Right - $d, $rect.Bottom - $d, $d, $d, 0, 90)
        $path.AddArc($rect.X, $rect.Bottom - $d, $d, $d, 90, 90)
        $path.CloseFigure()
        $g.FillPath($bgBrush, $path)
        if ($hasBorder) {
            $g.DrawPath($rimPen, $path)
        }
        $path.Dispose()
    }

    # Draw the monogram inside
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
    $g.DrawImage($srcImg, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

    $bgBrush.Dispose()
    $rimPen.Dispose()
    $g.Dispose()

    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
}

$scratchDir = "C:\Users\manje\.gemini\antigravity\brain\5c1c15df-4782-455d-9806-9c349e90b192"
Create-Favicon "$scratchDir\test_favicon_circle_rim.png" 128 "circle" $true
Create-Favicon "$scratchDir\test_favicon_circle_solid.png" 128 "circle" $false
Create-Favicon "$scratchDir\test_favicon_squircle_rim.png" 128 "squircle" $true
Create-Favicon "$scratchDir\test_favicon_squircle_solid.png" 128 "squircle" $false

$srcImg.Dispose()
"Generated test favicons in brain directory."
