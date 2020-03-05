(function () {
    function navegarViaAjax(hash) { /* hash é propridade depois do # */
        if (!hash) return /* se hash for falso retorna */

        const link = document.querySelector(`[wm-link='${hash}']`)
        if(!link) return

        const destino = document.querySelector('[wm-link-destino]')

        const url = hash.substring(1) /* epgando o endereço depois do # */
        fetch(url)
            .then(resp => resp.text())
            .then(html => {
                destino.innerHTML = html
                const resultado = html.match(/\<script\>([\s\S]*)\<\/script\>/)
                if(resultado && resultado.length >= 2){     
                    eval(resultado[1]) /* pegar tudo que ta dentro da tag script e processar */
                }
            })
    }

    function configurarLinks() {
        document.querySelectorAll('[wm-link]') /* selecionado a propridedade href e colondo  igual do atributo wm-link */
            .forEach(link => {
                link.href = link.attributes['wm-link'].value
            })
    }

    function navegacaoInicial() {
        if (location.hash) {
            navegarViaAjax(location.hash)
        } else {
            const primeiroLink = document.querySelector('[wm-link]')
            navegarViaAjax(primeiroLink.hash)
        }
    }

    window.onhashchange = e => navegarViaAjax(location.hash) /* onhashchange diparar o evento quando a acorar nudar(hash) */
    
    configurarLinks()
    navegacaoInicial()
})()