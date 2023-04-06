const header = document.querySelector('header');
const menuLinks = document.querySelectorAll('.menu-link');
const menu = document.querySelector('.menu');
const burgerBtn = document.querySelector('.burger');
const img = document.querySelector('img');
const input = document.querySelector('input');
const answer = document.querySelector('.answer');
const pErorr = document.querySelector('.error');


const username = document.querySelector('#name');
const email = document.querySelector('#email');
const textarea = document.querySelector('#textarea');
const sendBtn = document.querySelector('.contact-btn');
const popup = document.querySelector('.popup')



// KONTAKT

const showError = (input, msg) => {
    const contactFormField = input.parentElement;
    const errorMsg = contactFormField.querySelector('.error-text');

    contactFormField.classList.add('error');
    errorMsg.textContent = msg;
}

const clearError = (input) => {
    const contactFormField = input.parentElement;
    contactFormField.classList.remove('error');
}

const checkForm = input => {
    input.forEach(el => {
        if (el.value === '') {
            showError(el, el.placeholder)
        } else {
            clearError(el)
        };
    });
};
const checkEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email.value)) {
        clearError(email)
    } else {
        showError(email, 'E-mail jest niepoprawny')
    }
}

const checkErrors = () => {

    const allInputs = document.querySelectorAll('.contact-form-field');
    let errorCount = 0;

    allInputs.forEach(el => {
        if (el.classList.contains('error')) {
            errorCount++
        }
    })

    if (errorCount === 0) {
        popup.classList.add('show-popup')
    }
}





// BURGER BTN


const stickHeader = () => {
	const scroll = window.scrollY;

	if (scroll > 0) {
		header.classList.add('active');
	} else {
		header.classList.remove('active');
	}
};
burgerBtn.addEventListener('click', () => {
	burgerBtn.classList.toggle('active');
	menu.classList.toggle('active');
});




// KULA ZGADULA


menuLinks.forEach((link) =>
	link.addEventListener('click', (e) => {
		const key = e.target.dataset.key;

		const section =
			document.querySelector(`.${key}`).getBoundingClientRect().top +
			window.pageYOffset -
			110;

		menu.classList.remove('active');
		burgerBtn.classList.remove('active');

		window.scrollTo({ top: section, behavior: 'smooth' });
	})
);
const answearArea = [
	'TAK',
	'Nie..',
	'Może.',
	'Ciężko powiedzieć..',
	'Nie chcesz znać odpowiedzi na to pytanie... :/',
];
const shakeBall = () => {
	img.classList.add('shake-animaton');
	setTimeout(checkInput, 1000);
	setTimeout(() => {
		img.classList.remove('shake-animaton');
	}, 1000);
};



const checkInput = () => {
	if (input.value !== '' && input.value.slice(-1) === '?') {
		generateAnswer();
		pErorr.textContent = '';  
	} else if (input.value !== '' && input.value.slice(-1) !== '?') {
		pErorr.textContent = 'Pytanie musi być zakończone znakiem "?"';
		answer.textContent = '';
	} else {
		pErorr.textContent = 'Musisz zadać pytanie';
		answer.textContent = '';
	}

	img.classList.remove('shake-animation');
};

const generateAnswer = () => {
	const number = Math.floor(Math.random() * 5);

	answer.innerHTML = `<span>Odpowiedź:</span> ${answearArea[number]}`;
};









sendBtn.addEventListener('click', e => {
    e.preventDefault();

    checkForm([username, email, textarea])
	checkEmail(email);
    checkErrors()

})
window.addEventListener('scroll', stickHeader);
img.addEventListener('click', shakeBall);