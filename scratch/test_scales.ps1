Add-Type -Path "scratch\FaviconTuner.cs" -ReferencedAssemblies "System.Drawing"

$srcPath = "c:\Users\manje\OneDrive\Desktop\Manjeet PROMPT\assets\images\branding\m_monogram_color.png"
$srcImg = [System.Drawing.Bitmap]::FromFile($srcPath)
$brainDir = "C:\Users\manje\.gemini\antigravity\brain\5c1c15df-4782-455d-9806-9c349e90b192"

$bmp52 = [FaviconTuner]::RenderRoundedSquare($srcImg, 128, [float]0.52)
$bmp58 = [FaviconTuner]::RenderRoundedSquare($srcImg, 128, [float]0.58)
$bmp64 = [FaviconTuner]::RenderRoundedSquare($srcImg, 128, [float]0.64)

$bmp52.Save("$brainDir\tune_scale_52.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp58.Save("$brainDir\tune_scale_58.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp64.Save("$brainDir\tune_scale_64.png", [System.Drawing.Imaging.ImageFormat]::Png)

$bmp52.Dispose()
$bmp58.Dispose()
$bmp64.Dispose()
$srcImg.Dispose()
"Rendered 52%, 58%, 64% scales successfully."
