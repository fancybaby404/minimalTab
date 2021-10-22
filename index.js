const checkTheme = () => {
    // i am sorry my future self
    if (localStorage.getItem('theme') == 'light') {
        // remove theme class
        $('body').removeClass('dark-theme')
        $('body').removeClass('photo-theme')
        $('.header .settings-icon').removeClass('photo-img')

        $('.settings-icon').removeClass('dark-theme')
        $('button img').removeClass('dark-theme white-img')
        $('button').removeClass('dark-theme')
        $('body').removeClass('photo-img')
        $('.settings').css({ 'background-color': 'black' })
        $('img').removeClass('white-img')

        // add theme class
        $('ul').addClass('white-theme')
        $('.todo-body').addClass('white-theme')
        $('.settings-icon').addClass('white-theme')
        $('.header button').attr('style', 'background:white;')
        // $('.todo button').attr('style', 'background:black;')
        $('.header button img').addClass('dark-img light-theme')

        $('.settings button').attr('style', 'background:black;')
        $('.settings img').addClass('white-img')

        $('.background-image').attr('hidden', true)
        $('body').attr('style', '')
        return;
    } else if (localStorage.getItem('theme') == 'dark') {
        // remove theme class
        $('body').removeClass('light-theme')
        $('body').removeClass('photo-theme')
        $('.header .settings-icon').removeClass('photo-img')

        $('.settings-icon').removeClass('light-theme')
        $('img').removeClass('light-theme dark-img')
        // $('img').removeClass('dark-img')

        // add theme class
        $('body').addClass('dark-theme')

        $('.settings-icon').addClass('dark-theme')
        $('img').addClass('white-img')

        $('.background-image').attr('hidden', true)
        $('body').attr('style', '')
        return;
    } else if (localStorage.getItem('theme') == 'photo') {
        // remove theme class
        $('body').removeClass('light-theme')
        $('body').removeClass('dark-theme')

        // add theme class
        $('body').addClass('photo-theme')

        $('.header .settings-icon').addClass('photo-img')
        $('.header .settings-icon').removeClass('light-theme')
        $('.header .settings-icon').removeClass('dark-theme')
        $('.header .settings-icon').attr('style', '')
        $('img').addClass('white-img')

        $('.background-image').attr('hidden', false)

        let img = localStorage.getItem('photo')

        if ($('#contain').is(':checked')) {
            localStorage.setItem('background-size', 'contain')
        } else if ($('#cover').is(':checked')) {
            localStorage.setItem('background-size', 'checked')
        } else if ($('#inherit').is(':checked')) {
            localStorage.setItem('background-size', 'inherit')
        } else if ($('#initial').is(':checked')) {
            localStorage.setItem('background-size', 'initial')
        } else if ($('#revert').is(':checked')) {
            localStorage.setItem('background-size', 'revert')
        } else if ($('#unset').is(':checked')) {
            localStorage.setItem('background-size', 'unset')
        }

        if (localStorage.getItem('background-size') == 'contain') {
            $('body').attr('style', `background-image: url("${img}"); background-size: contain; background-repeat: no-repeat; background-attachment: fixed; background-position: center; `)

        } else if (localStorage.getItem('background-size') == 'cover') {
            $('body').attr('style', `background-image: url("${img}"); background-size: cover; background-repeat: no-repeat; background-attachment: fixed; background-position: center; `)

        } else if (localStorage.getItem('background-size') == 'inherit') {
            $('body').attr('style', `background-image: url("${img}"); background-size: inherit; background-repeat: no-repeat; background-attachment: fixed; background-position: center; `)

        } else if (localStorage.getItem('background-size') == 'initial') {
            $('body').attr('style', `background-image: url("${img}"); background-size: initial; background-repeat: no-repeat; background-attachment: fixed; background-position: center; `)

        } else if (localStorage.getItem('background-size') == 'revert') {
            $('body').attr('style', `background-image: url("${img}"); background-size: revert; background-repeat: no-repeat; background-attachment: fixed; background-position: center; `)

        } else if (localStorage.getItem('background-size') == 'unset') {
            $('body').attr('style', `background-image: url("${img}"); background-size: unset; background-repeat: no-repeat; background-attachment: fixed; background-position: center; `)
        } else {
            $('body').attr('style', `background-image: url("${img}"); background-size: cover; background-repeat: no-repeat; background-attachment: fixed; background-position: center; `)
        }

        // blur
        let blurVal = localStorage.getItem('blur')

        let currentStyle = $('body').attr('style')
        $('body').attr('style', `${currentStyle}backdrop-filter: blur(${blurVal}px);`)
        return;
    }
}


jQuery(() => {
    checkTheme();

    // get current todo stuff
    let appendDis = localStorage.getItem('todo')
    $('ul').append(appendDis)

    // get Date
    let date = new Date();
    let ddInt = String(date.getDate()).padStart(2, '0')
    let ddString = date.toLocaleString('default', { weekday: 'long' });
    let mmString = date.toLocaleString('default', { month: 'long' })
    $('h6')[0].innerHTML = `${ddString}, ${ddInt} ${mmString}`
    // =======================

    // length of todo
    let todoLength = $('.todo li').length
    $('h1')[0].innerHTML = `You have ${todoLength} tasks today`

    // ========== save current list of todo/theme
    $('body').on('click', (event) => {
        // save todo-items
        localStorage.setItem('todo', $('ul')[0].innerHTML)
    })

    // ========== Theme
    $('input').on('click', () => {
        // save theme
        if ($('#Light').is(':checked')) {
            localStorage.setItem('theme', 'light')
        } else if ($('#Dark').is(':checked')) {
            localStorage.setItem('theme', 'dark')
        } else if ($('#Photo').is(':checked')) {
            localStorage.setItem('theme', 'photo')
        }

        if ($('#contain').is(':checked')) {
            localStorage.setItem('background-size', 'contain')
        } else if ($('#cover').is(':checked')) {
            localStorage.setItem('background-size', 'checked')
        } else if ($('#inherit').is(':checked')) {
            localStorage.setItem('background-size', 'inherit')
        } else if ($('#initial').is(':checked')) {
            localStorage.setItem('background-size', 'initial')
        } else if ($('#revert').is(':checked')) {
            localStorage.setItem('background-size', 'revert')
        } else if ($('#unset').is(':checked')) {
            localStorage.setItem('background-size', 'unset')
        }

        checkTheme();
    })

    $('.submit-link').on('click', (event) => {
        let link = $('#input-link').val()
        localStorage.setItem('photo', link)

        checkTheme();
    })


    $('#file').on('change', () => {
        const reader = new FileReader();

        $(reader).on('load', () => {
            localStorage.setItem('photo', reader.result)
        })

        reader.readAsDataURL($('#file').prop('files')[0]);

        localStorage.getItem('photo')

        // let img = new Image;
        // img.src = URL.createObjectURL($('#file').prop('files')[0]);
        // localStorage.setItem('photo', img.src)

        checkTheme();
    });

    $('.form-range').on('change', () => {
        let blurRange = $('.form-range').val()
        localStorage.setItem('blur', blurRange)

        checkTheme();
    })

    // ========== submit todo button
    $('.text').hover(() => { $('.submit-text').attr('style', 'opacity:100;') }, () => { $('.submit-text').attr('style', 'opacity:0;') })

    // $('input').on('hover', (event) => {
    // $('.submit-text').attr('hidden', true)
    //     console.log('hovering')
    // });

    // simulate button click on enter
    $('input').on('keyup', (event) => {

        if (event.key == 'Enter') {
            $('.submit-text').trigger('click')
        }
    })

    $('.submit-text').on('click', (event) => {

        // add todo 
        let todoText = $('input').val()
        console.log(todoText)
        // $('ul').prepend(
        //     `<li style="padding:20px;">${todoText}<button class="rmv btn btn-sm btn-outline-light ms-2 float-end">❌</button><button class="rmv btn btn-sm btn-outline-light ms-2 float-end">✔️</button> </li>
        //     `)


        $('ul').prepend(`
        <li class="li-style center"> 
            <div class="div-li-container">
                    <div class="div-li-style">
                    <button class="rmv btn" type="submit"><img class="white-img" src="/images/close.svg"></button>
                        <span "span-class" contenteditable>${todoText}</span>
                    </div>
            </div>
        </li> 
        `)

        // $('ul').prepend(`<li class="li-style center"> <div class="div-li-container"> <div class="div-li-style"> <span "span-class" contenteditable>${todoText}</span> <button class="rmv btn" type="submit"><img class="white-img" src="/images/close.svg"></button> </div> </div> </li>`)
        // add error if text is too large
        // if (todoText.length > 20) {
        //     $('.error').attr('hidden', false)
        //     setTimeout(() => {
        //         $('.error').slideDown()
        //     }, 1000)
        //     setTimeout(() => {
        //         $('.error').slideUp()
        //     }, 5000)
        //     return
        // }

        // change todolength
        let todoLength = $('.todo li').length
        $('h1')[0].innerHTML = `You have ${todoLength} tasks today`

        // remove text on input
        $('input').val('')

        checkTheme()
    });

    // ========== remove todo button
    $('body').on('click', '.rmv', (event) => {

        // remove 
        $(event.target).closest('li').remove()

        // change todolength
        let todoLength = $('.todo li').length
        $('h1')[0].innerHTML = `You have ${todoLength} tasks today`
    });

    // ========== show settigns
    $('.settings-icon').on('click', (event) => {

        // if ($('.settings').position().top >= 1000) {
        //     console.log('going up')
        //     $('.settings-icon').addClass('disabled')
        //     $('.settings').animate({ top: '0px' }, 1500);
        //     $('.settings-icon').removeClass('disabled')

        // } else {
        //     console.log('going down')
        //     $('.settings-icon').addClass('disabled')
        //     $('.settings').animate({ top: '1000px' }, 1500);
        //     $('.settings-icon').removeClass('disabled')
        // }

        if ($('.settings').hasClass('slide-up')) {
            // $('.full-body').animate({
            //     'right': '500px'
            // })
            $('.settings').addClass('slide-down');
            $('.settings').removeClass('slide-up');
            $('.settings').show('slide', { direction: 'right' }, 400);
        } else {

            // $('.full-body').animate({
            //     'left': '1500px'
            // })
            $('.settings').removeClass('slide-down');
            $('.settings').addClass('slide-up');
            $('.settings').hide('slide', { direction: 'right' }, 400);
        }

        // let attr = $('.settings').attr('hidden');
        // $('.settings').slideToggle()

        // if (typeof attr !== 'undefined' && attr !== false) {
        //     setTimeout(() => {
        //         $('.settings').slideUp()
        //     }, 5000)
        //     $('.settings').attr('hidden', false)
        // } else {
        //     setTimeout(() => {
        //         $('.settings').slideDown()
        //     }, 5000)
        //     $('.settings').attr('hidden', true)
        // }

    })

    // sortable todo
    $('#sortable').sortable()

})

// Default Theme
if (localStorage.getItem('theme') === null) {
    localStorage.setItem('theme', 'dark')
    console.log('set default theme.')
}
if (localStorage.getItem('background-size') == null) {
    localStorage.setItem('background-size', 'cover')
    console.log('set default bg-size.')
}
if (localStorage.getItem('blur') == null) {
    localStorage.setItem('blur', 0)
    console.log('set default blur range')
}
