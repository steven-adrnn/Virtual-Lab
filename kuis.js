let currentQuestionIndex = 0;
let score = 0;
let timer = 30;
let intervalId;
let answerSelected = false;

document.addEventListener('DOMContentLoaded', function() {
    // Tambahkan event listener untuk tombol start
    const startButton = document.getElementById('start-btn');
    const quizContent = document.getElementById('quiz-content');
    const quizStart = document.getElementById('quiz-start');

    startButton.addEventListener('click', function() {
        quizStart.style.display = 'none';
        quizContent.style.display = 'block';
        loadQuestion();
        
    });
});

const questions = [
    {
        question: 'Apa itu Bubble Sort?',
        options: ['Algoritma pengurutan yang membandingkan elemen berdekatan', 'Algoritma pengurutan yang memilih pivot', 'Algoritma pengurutan yang membagi array menjadi dua bagian'],
        correctAnswer: 'Algoritma pengurutan yang membandingkan elemen berdekatan'
    },
    {
        question: 'Apa kompleksitas waktu rata-rata Quick Sort?',
        options: ['O(n)', 'O(n log n)', 'O(n^2)'],
        correctAnswer: 'O(n log n)'
    },
    {
        question: 'Algoritma pengurutan mana yang menggunakan teknik "divide and conquer"?',
        options: ['Bubble Sort', 'Insertion Sort', 'Merge Sort'],
        correctAnswer: 'Merge Sort'
    },
    {
        question: 'Dalam kasus terburuk, algoritma pengurutan mana yang memiliki kompleksitas waktu O(n^2)?',
        options: ['Merge Sort', 'Quick Sort', 'Heap Sort'],
        correctAnswer: 'Quick Sort'
    },
    {
        question: 'Algoritma pengurutan mana yang paling efisien untuk array yang hampir terurut?',
        options: ['Bubble Sort', 'Insertion Sort', 'Quick Sort'],
        correctAnswer: 'Insertion Sort'
    },
    {
        question: 'Apa itu "stable sorting algorithm"?',
        options: ['Algoritma yang selalu menghasilkan urutan yang sama', 'Algoritma yang mempertahankan urutan relatif elemen dengan nilai yang sama', 'Algoritma yang tidak mengubah array asli'],
        correctAnswer: 'Algoritma yang mempertahankan urutan relatif elemen dengan nilai yang sama'
    },
    {
        question: 'Algoritma pengurutan mana yang menggunakan teknik "heapify"?',
        options: ['Merge Sort', 'Quick Sort', ' Heap Sort'],
        correctAnswer: 'Heap Sort'
    },
    {
        question: 'Berapa banyak perbandingan yang dilakukan Bubble Sort dalam kasus terburuk?',
        options: ['O(n)', 'O(n log n)', 'O(n^2)'],
        correctAnswer: 'O(n^2)'
    },
    {
        question: 'Algoritma pengurutan mana yang paling cocok untuk mengurutkan linked list?',
        options: ['Quick Sort', 'Merge Sort', 'Heap Sort'],
        correctAnswer: 'Merge Sort'
    },
    {
        question: 'Apa keuntungan utama dari algoritma pengurutan in-place?',
        options: ['Lebih cepat', 'Menggunakan memori tambahan yang konstan', 'Selalu stabil'],
        correctAnswer: 'Menggunakan memori tambahan yang konstan'
    }
];

function loadQuestion() {
    answerSelected = false;
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const resultElement = document.getElementById('result');
    const progressBar = document.getElementById('progress');
    const questionNumberElement = document.getElementById('question-number');
    const timerElement = document.getElementById('timer');

    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        
        questionElement.textContent = currentQuestion.question;
        
        optionsElement.innerHTML = '';
        
        currentQuestion.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.textContent = option;
            optionDiv.addEventListener('click', () => selectOption(optionDiv, currentQuestion));
            optionsElement.appendChild(optionDiv);
        });

        resultElement.textContent = '';
        
        progressBar.style.width = `${(currentQuestionIndex + 1) / questions.length * 100}%`;
        
        questionNumberElement.textContent = `Pertanyaan ${currentQuestionIndex + 1} dari ${questions.length}`;
        
        resetTimer();
        startTimer();
    } else {
        showFinalScore();
    }
}

function selectOption(selectedOption, currentQuestion) {
    if (answerSelected) return;
    
    answerSelected = true;
    clearInterval(intervalId);

    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    selectedOption.classList.add('selected');

    const resultElement = document.getElementById('result');
    
    if (selectedOption.textContent === currentQuestion.correctAnswer) {
        resultElement.textContent = 'Jawaban Anda benar!';
        selectedOption.classList.add('correct');
        score++;
    } else {
        resultElement.textContent = `Jawaban Anda salah. Jawaban yang benar adalah: ${currentQuestion.correctAnswer}`;
        selectedOption.classList.add('incorrect');
        options.forEach(option => {
            if (option.textContent === currentQuestion.correctAnswer) {
                option.classList.add('correct');
            }
        });
    }

    setTimeout(loadNextQuestion, 5000); 
}

function loadNextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function showFinalScore() {
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.innerHTML = `
        <h2>Kuis Selesai!</h2>
        <p>Skor Anda: ${score} dari ${questions.length}</p>
        <button id="restart-btn" class="quiz-btn">Mulai Ulang Kuis</button>
    `;
    document.getElementById('restart-btn').addEventListener('click', restartQuiz);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.innerHTML = `
        <h1>Kuis: Algoritma Pengurutan</h1>
        <div id="progress-bar" class="progress -bar">
            <div id="progress" class="progress"></div>
        </div>
        <div id="quiz-info">
            <span id="question-number">Pertanyaan 1 dari 10</span>
            <span id="timer">Waktu: 30</span>
        </div>
        <div id="flashcard" class="flashcard">
            <div id="question" class="question-text"></div>
            <div id="options" class="options-container"></div>
            <div id="result" class="result-message"></div>
        </div>
    `;
    loadQuestion();
}

function resetTimer() {
    timer = 30;
    document.getElementById('timer').textContent = `Waktu: ${timer} detik`;
}

function startTimer() {
    intervalId = setInterval(() => {
        timer--;
        document.getElementById('timer').textContent = `Waktu: ${timer} detik`;
        if (timer === 0) {
            clearInterval(intervalId);
            checkAnswer();
        }
    }, 1000);
}

