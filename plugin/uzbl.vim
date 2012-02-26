" Reload a specific file
fun! UzblReloadFile() "{{{
    " Use the current file and update all files on the page with the same name.
    " Paths are not considered.
    let bufname = expand('<afile>:t')

    call UzblSendToFifo('js uzbl_reload_file(\"' . bufname . '\");')
endfunction "}}}

" Send to all the uzbl fifos
fun! UzblSendToFifo(cmd) "{{{
    for f in split(globpath('/tmp', 'uzbl_fifo*'), "\n")
        " Always tell uzbl to source the javascript.
        let src = globpath(&runtimepath, 'external/uzbl.js')
        let expr = 'echo "script '.src.'" > ' . f

        " Echo the actual command
        let expr = expr . ' && echo "' . a:cmd . '" > ' . f

        " Execute in silence.
        silent! execute "!" . expr
    endfor
endfunction "}}}

" Trigger a full reload of the page
fun! UzblReloadPage() "{{{
    call UzblSendToFifo('reload')
endfunction "}}}

augroup uzbl
    au!
    au BufWritePost *.css call UzblReloadFile()
    au BufWritePost *.html call UzblReloadPage()
    au BufWritePost *.py call UzblReloadPage()
augroup END
