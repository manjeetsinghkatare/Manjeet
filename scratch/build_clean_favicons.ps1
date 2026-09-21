Add-Type -Path "scratch\FaviconTuner.cs" -ReferencedAssemblies "System.Drawing"

$srcPath = "c:\Users\manje\OneDrive\Desktop\Manjeet PROMPT\assets\images\branding\m_monogram_color.png"
$srcImg = [System.Drawing.Bitmap]::FromFile($srcPath)

$brandingDir = "c:\Users\manje\OneDrive\Desktop\Manjeet PROMPT\assets\images\branding"
$rootDir = "c:\Users\manje\OneDrive\Desktop\Manjeet PROMPT"
$brainDir = "C:\Users\manje\.gemini\antigravity\brain\5c1c15df-4782-455d-9806-9c349e90b192"

function Save-BmpBytes($bmp) {
    $ms = New-Object System.IO.MemoryStream
    $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
    $bytes = $ms.ToArray()
    $ms.Dispose()
    return $bytes
}

# Scale ratio: 0.58 (58% height, leaving 21% padding above/below, clean & moderate)
$ratio = [float]0.58

$bmp16 = [FaviconTuner]::RenderRoundedSquare($srcImg, 16, $ratio)
$bmp32 = [FaviconTuner]::RenderRoundedSquare($srcImg, 32, $ratio)
$bmp48 = [FaviconTuner]::RenderRoundedSquare($srcImg, 48, $ratio)
$bmp180 = [FaviconTuner]::RenderRoundedSquare($srcImg, 180, $ratio)
$bmp192 = [FaviconTuner]::RenderRoundedSquare($srcImg, 192, $ratio)
$bmp512 = [FaviconTuner]::RenderRoundedSquare($srcImg, 512, $ratio)

$bytes16 = Save-BmpBytes $bmp16
$bytes32 = Save-BmpBytes $bmp32
$bytes48 = Save-BmpBytes $bmp48

# Save PNGs to branding dir
$bmp16.Save("$brandingDir\favicon-16x16.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp32.Save("$brandingDir\favicon-32x32.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp180.Save("$brandingDir\apple-touch-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp192.Save("$brandingDir\android-chrome-192x192.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp512.Save("$brandingDir\android-chrome-512x512.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Also save apple-touch-icon to root
$bmp180.Save("$rootDir\apple-touch-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Create multi-size favicon.ico
Add-Type -Path "scratch\FaviconBuilder.cs" -ReferencedAssemblies "System.Drawing"
$pngList = New-Object 'System.Collections.Generic.List[byte[]]'
$pngList.Add($bytes16)
$pngList.Add($bytes32)
$pngList.Add($bytes48)
$sizes = @(16, 32, 48)

[FaviconBuilder]::CreateIco($pngList, $sizes, "$rootDir\favicon.ico")
Copy-Item "$rootDir\favicon.ico" "$brandingDir\favicon.ico" -Force

# Create clean SVG favicon (solid black rounded-square, centered M, no border)
$b64 = [Convert]::ToBase64String((Save-BmpBytes $bmp512))
$svgContent = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="112" ry="112" fill="#000000" />
  <image href="data:image/png;base64,$b64" x="0" y="0" width="512" height="512" />
</svg>
"@
Set-Content -Path "$brandingDir\favicon.svg" -Value $svgContent -Encoding UTF8
Set-Content -Path "$rootDir\favicon.svg" -Value $svgContent -Encoding UTF8

# Copy to brain for verification
Copy-Item "$brandingDir\favicon-32x32.png" "$brainDir\verify_clean_favicon_32x32.png" -Force
Copy-Item "$brandingDir\favicon-16x16.png" "$brainDir\verify_clean_favicon_16x16.png" -Force
Copy-Item "$brandingDir\apple-touch-icon.png" "$brainDir\verify_clean_apple_touch_icon.png" -Force
Copy-Item "$brandingDir\android-chrome-192x192.png" "$brainDir\verify_clean_android_192.png" -Force

$bmp16.Dispose()
$bmp32.Dispose()
$bmp48.Dispose()
$bmp180.Dispose()
$bmp192.Dispose()
$bmp512.Dispose()
$srcImg.Dispose()

"Clean rounded-square favicons built successfully!"
