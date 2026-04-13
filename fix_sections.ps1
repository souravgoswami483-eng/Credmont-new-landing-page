$ErrorActionPreference = 'Stop'
$html = Get-Content "d:\Office\Landing pages\Credmont landing page\index.html" -Encoding UTF8 -Raw
$lines = $html -split "`r`n", -1

$part1 = $lines[0..115]      # 1 to 116 (Hero)
$grades = $lines[346..503]   # 347 to 504 (Grades)
$part3 = $lines[116..148]    # 117 to 149 (Stats strip start)
$part4 = $lines[156..345]    # 157 to 346 (Stats strip end to end of Why Us)
$part5 = $lines[504..($lines.Length - 1)] # 505 to End (Banner CTA to end)

$newLines = @()
$newLines += $part1
$newLines += $grades
$newLines += $part3
$newLines += $part4
$newLines += $part5

$newHtml = $newLines -join "`r`n"
Set-Content -Path "d:\Office\Landing pages\Credmont landing page\index.html" -Value $newHtml -Encoding UTF8
Write-Output "Successfully modified sections!"
