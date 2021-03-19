let formTextBlocks = document.querySelectorAll('form.text-blocks');
let formImagesBlocks = document.querySelectorAll('form.images-blocks');


for(let i of formTextBlocks) {
    let inputFormTextBlocks = i.querySelectorAll('input');
    for(let i of inputFormTextBlocks) {
        i.onclick = function() {
            for(let i of inputFormTextBlocks) {
                if(i.checked) {
                    i.closest('label').classList.add('active');
                } else {
                    i.closest('label').classList.remove('active');
                }
            }
        } 
    }
}

for(let i of formImagesBlocks) {
    let inputImagesBlocks = i.querySelectorAll('input');
    for(let i of inputImagesBlocks) {
        i.onclick = function() {
            for (let i of inputImagesBlocks) {
                if(i.checked) {
                    i.closest('.label-wrap').previousElementSibling.classList.add('active');
                }else {
                    i.closest('.label-wrap').previousElementSibling.classList.remove('active');
                }
            }
        } 
    }
}

let max = 6;
let index = 1;
let curentStep = document.querySelector('.curent');
let leftStep = document.querySelector('.left span');
let nextBtn  = document.querySelector('.next');
let prevBtn  = document.querySelector('.prev');
let flightIcon = document.querySelector('.flight');
let progress = 17;

function changeTheStateOfAButton() {
    let quizContent = document.querySelector('.quiz-content.active');
    if(quizContent.querySelector('input:checked') != null) {
        removeDisabled(nextBtn);
    } else if (quizContent.classList.contains('quiz-content_contact')){
        formValidate()
        // nextBtn.onclick = formSend;
    } else {
        addDisabled(nextBtn);
    }          
}

function checkValidate() {
    nextBtn.onclick = formValidate;
}

changeTheStateOfAButton();

document.onclick = changeTheStateOfAButton;

nextBtn.onclick = function() {
    if(!nextBtn.classList.contains('disabled') && index != 6) {
        let quizContent = document.querySelector('.quiz-content.active');
        quizContent.classList.remove('active');
        quizContent.nextElementSibling.classList.add('active');
        index++;
        max--;
        curentStep.innerHTML = index + ' шаг';
        leftStep.innerHTML = max;
        let tootlipMessage = document.querySelector('.tootlip__message.active');
        tootlipMessage.classList.remove('active');
        tootlipMessage.nextElementSibling.classList.add('active');
        document.querySelector('.flight').style.left = progress + '%';
        progress = progress + 17;
        console.log(index);
    } else if (index == 6) {
        addDisabled(nextBtn);
    }
}

prevBtn.onclick = function() {
    if(index > 1) {
        let quizContent = document.querySelector('.quiz-content.active');
        quizContent.classList.remove('active');
        quizContent.previousElementSibling.classList.add('active');
        index--;
        max++;
        curentStep.innerHTML = index + ' шаг';
        leftStep.innerHTML = max;
        let tootlipMessage = document.querySelector('.tootlip__message.active');
        tootlipMessage.classList.remove('active');
        tootlipMessage.previousElementSibling.classList.add('active');
        console.log(index);
    }
}

function addDisabled(elem) {
    elem.classList.add('disabled')
}

function removeDisabled(elem) {
    elem.classList.remove('disabled')
}

function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
        let input = formReq[index];
        formRemoveError(input);
        removeDisabled(nextBtn);
        if(input.getAttribute('type') == 'email') {
           if(emailTest(input)) {
               formAddError(input);
               error++;
           } 
        } else if((input.getAttribute('type') == 'tel')) {
            if(telTest(input)) {
                formAddError(input);
                error++;
            }
        }
        if(error > 0) {
            addDisabled(nextBtn);
        } else {
            removeDisabled(nextBtn);
        }
    }
}


function formAddError(input) {
    input.classList.add('error');
}

function formRemoveError(input) {
    input.classList.remove('error');
}

function emailTest(input) {
    return !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input.value);
}

function telTest(input) {
    return !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(input.value);
}

async function formSend(e) {
    e.preventDefault();
    let form = quizContent.querySelector('form');

    form.classList.add('_sending');
    let response = await fetch('sendmail.php', {
        method: 'POST',
        body: 'topola'
    });
    if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
        form.classList.remove('_sending');
    } else {
        alert("Ошибка");
        form.classList.remove('_sending');
    }

}