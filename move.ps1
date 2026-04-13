$ErrorActionPreference = 'Stop'
$text = Get-Content -Path "d:\Office\Landing pages\Credmont landing page\index.html" -Raw -Encoding UTF8

$searchStr = "    <!-- Grades / Curriculumn Section -->"
$endStr = "</section>"
$idx1 = $text.IndexOf($searchStr)

if ($idx1 -ge 0) {
    # Find the next </section> after the start
    $idx2 = $text.IndexOf($endStr, $idx1) + $endStr.Length
    
    # Extract the block + trailing newline
    $gradesBlock = $text.Substring($idx1, $idx2 - $idx1)
    
    # Remove it from current location (and follow-up newlines)
    $text = $text.Remove($idx1, $gradesBlock.Length)
    # clean up any trailing empty lines where it used to be
    $text = $text -replace '(\r\n){3,}', "`r`n`r`n"
    
    # Find insertion point: right before "    <!-- Stats Strip -->"
    $insertStr = "    <!-- Stats Strip -->"
    $heroEndIdx = $text.IndexOf($insertStr)
    
    if ($heroEndIdx -ge 0) {
        $text = $text.Insert($heroEndIdx, $gradesBlock + "`r`n`r`n")
        Set-Content -Path "d:\Office\Landing pages\Credmont landing page\index.html" -Value $text -Encoding UTF8
        Write-Output "Successfully moved the Where Do You Want To Start section!"
    } else {
        Write-Output "Couldn't find target insertion point."
    }
} else {
    Write-Output "Couldn't find the grades section."
}
