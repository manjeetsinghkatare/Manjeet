Add-Type -Path "scratch\FaviconBuilder.cs" -ReferencedAssemblies "System.Drawing"

$srcPath = "c:\Users\manje\OneDrive\Desktop\Manjeet PROMPT\assets\images\branding\m_monogram_color.png"
$srcImg = [System.Drawing.Bitmap]::FromFile($srcPath)

$cropSize = 960
$centerX = 632
$centerY = 652

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

# 1. Generate PNGs
$bmp16 = [FaviconBuilder]::RenderIcon($srcImg, 16, $centerX, $centerY, $cropSize, $false)
$bmp32 = [FaviconBuilder]::RenderIcon($srcImg, 32, $centerX, $centerY, $cropSize, $false)
$bmp48 = [FaviconBuilder]::RenderIcon($srcImg, 48, $centerX, $centerY, $cropSize, $false)
$bmp180 = [FaviconBuilder]::RenderIcon($srcImg, 180, $centerX, $centerY, $cropSize, $true)
$bmp192 = [FaviconBuilder]::RenderIcon($srcImg, 192, $centerX, $centerY, $cropSize, $false)
$bmp512 = [FaviconBuilder]::RenderIcon($srcImg, 512, $centerX, $centerY, $cropSize, $false)

$bytes16 = Save-BmpBytes $bmp16
$bytes32 = Save-BmpBytes $bmp32
$bytes48 = Save-BmpBytes $bmp48

# Save individual files
$bmp16.Save("$brandingDir\favicon-16x16.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp32.Save("$brandingDir\favicon-32x32.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp180.Save("$brandingDir\apple-touch-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp192.Save("$brandingDir\android-chrome-192x192.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp512.Save("$brandingDir\android-chrome-512x512.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Also copy to root for standard fallback crawlers
$bmp180.Save("$rootDir\apple-touch-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)

# 2. Generate multi-size favicon.ico
$pngList = New-Object 'System.Collections.Generic.List[byte[]]'
$pngList.Add($bytes16)
$pngList.Add($bytes32)
$pngList.Add($bytes48)
$sizes = @(16, 32, 48)

[FaviconBuilder]::CreateIco($pngList, $sizes, "$rootDir\favicon.ico")
Copy-Item "$rootDir\favicon.ico" "$brandingDir\favicon.ico" -Force

# 3. Generate favicon.svg (Vector circle background with high-res crisp monogram and responsive theme colors)
$b64 = [Convert]::ToBase64String((Save-BmpBytes $bmp512))
$svgContent = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <radialGradient id="tabGlow" cx="50%" cy="50%" r="50%">
      <stop offset="70%" stop-color="#0b0f19" />
      <stop offset="100%" stop-color="#111827" />
    </radialGradient>
    <filter id="subtleRim" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#3b82f6" flood-opacity="0.35"/>
    </filter>
  </defs>
  <style>
    .bg-circle { fill: #0b0f19; stroke: #3b82f6; stroke-width: 16; }
    @media (prefers-color-scheme: light) {
      .bg-circle { fill: #090d16; stroke: #2563eb; stroke-width: 18; }
    }
  </style>
  <circle class="bg-circle" cx="256" cy="256" r="246" filter="url(#subtleRim)"/>
  <image href="data:image/png;base64,$b64" x="0" y="0" width="512" height="512" />
</svg>
"@
Set-Content -Path "$brandingDir\favicon.svg" -Value $svgContent -Encoding UTF8
Set-Content -Path "$rootDir\favicon.svg" -Value $svgContent -Encoding UTF8

# 4. Generate site.webmanifest
$manifest = @"
{
  "name": "Manjeet Singh Katare — Portfolio",
  "short_name": "Manjeet",
  "description": "Official portfolio of Manjeet Singh Katare — MBA Marketing & HR, Digital Marketing Specialist",
  "icons": [
    {
      "src": "/assets/images/branding/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/assets/images/branding/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#0b0f19",
  "background_color": "#0b0f19",
  "display": "standalone",
  "start_url": "/"
}
"@
Set-Content -Path "$rootDir\site.webmanifest" -Value $manifest -Encoding UTF8

# 5. Copy samples to brain for verification
Copy-Item "$brandingDir\favicon-32x32.png" "$brainDir\verify_favicon_32x32.png" -Force
Copy-Item "$brandingDir\favicon-16x16.png" "$brainDir\verify_favicon_16x16.png" -Force
Copy-Item "$brandingDir\apple-touch-icon.png" "$brainDir\verify_apple_touch_icon.png" -Force
Copy-Item "$brandingDir\android-chrome-192x192.png" "$brainDir\verify_android_192.png" -Force
Copy-Item "$rootDir\favicon.ico" "$brainDir\verify_favicon.ico" -Force

# Cleanup resources
$bmp16.Dispose()
$bmp32.Dispose()
$bmp48.Dispose()
$bmp180.Dispose()
$bmp192.Dispose()
$bmp512.Dispose()
$srcImg.Dispose()

"All favicons and manifest generated successfully!"
