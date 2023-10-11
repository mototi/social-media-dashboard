const btns = document.querySelectorAll('.toggle__wrapper input')


const storage = () => {
    const mode = localStorage.getItem('colorMode')
    console.log(mode);
    if (mode == 'dark'){
        setDarkMode();
        document.getElementById('dark').click()
    }
    else if (mode == 'light'){
        setLightMode();
        document.getElementById('light').click()
    }
}

const checkLightMode = () => {
    if (window.matchMedia('(prefers-color-scheme: light)').matches){
        document.getElementById('light').click()
    }
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches){
        document.getElementById('dark').click()
    }
}


const setDarkMode = () => {
    document.querySelector('body').classList = "dark"
}

const setLightMode = () => {
    document.querySelector('body').classList = "light" ;
}

checkLightMode();
storage();

btns.forEach(btn => {
    btn.addEventListener('click' , (event) => {
        if(document.getElementById('dark').checked){
            localStorage.setItem('colorMode' , 'dark')
            setDarkMode();
        } 
        else {
            localStorage.setItem('colorMode' , 'light')
            setLightMode();
        } 
    })
});

