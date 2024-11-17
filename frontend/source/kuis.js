let currentQuestionIndex = 0;
let score = 0;
let timer = 30;
let intervalId;
let answerSelected = false;

document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-btn');
    const quizContent = document.getElementById('quiz-content');
    const quizStart = document.getElementById('quiz-start');

    startButton.addEventListener('click', function() {
        quizStart.style.display = 'none';
        quizContent.style.display = 'block';
        // document.addEventListener('loadQuiz', loadQuestions);

        // document.addEventListener('loadQuiz', loadQuestions);
        loadQuestions(); // Pastikan ini memanggil loadQuestions
    });

    // if (localStorage.getItem('isLoggedIn') === 'true') {
    //     loadQuestions();
    // }

    
});

function loadQuestions() {
    fetch('https://backend-mu-ivory.vercel.app/api/quizzes/')
        .then(response => response.json())
        .then(questions => {
            window.questions = questions; // Simpan pertanyaan ke variabel global
            // currentQuestionIndex = 0; // Reset index pertanyaan
            // Proses pertanyaan dan tampilkan di UI
            // console.log(questions);
            // Ambil progres kuis pengguna
            fetch('http://localhost:8000/api/quiz-progress/', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access') // Gunakan token akses
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('User  not authenticated');
                }
            })
            .then(progress => {
                ngecek = progress[progress.length - 1].current_question_index;
                if (ngecek > 0 && ngecek < 9) {
                    // Jika ada progres, gunakan data tersebut
                    const userProgress = progress[progress.length-1]; // Ambil progres pertama
                    currentQuestionIndex = userProgress.current_question_index+1;
                    score = userProgress.score;
                } else {
                    // Jika tidak ada progres, mulai dari awal
                    currentQuestionIndex = 0;
                    score = 0;
                }
                loadQuestion(); // Muat pertanyaan berdasarkan progres
            })
            .catch(error => {
                console.error('Error fetching progress:', error);
                currentQuestionIndex = 0; // Mulai dari awal jika tidak ada progres
                loadQuestion(); // Jika gagal, mulai dari awal
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

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
        options: ['Merge Sort', 'Quick Sort', 'Heap Sort'],
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

    // Simpan progres kuis
    saveQuizProgress(currentQuestionIndex, score);

    setTimeout(loadNextQuestion, 1000);
}


function isAccessTokenValid() {
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
        return false; // Tidak ada token akses
    }

    // Coba kirim permintaan ke endpoint yang memerlukan autentikasi
    return fetch('http://localhost:8000/api/quiz-progress/', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
    .then(response => {
        return response.ok; // Jika response.ok true, token masih valid
    })
    .catch(() => {
        return false; // Jika ada kesalahan, anggap token tidak valid
    });
}

function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refresh');
    if (!refreshToken) {
        return Promise.reject('No refresh token found');
    }

    return fetch('http://localhost:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }
        return response.json();
    })
    .then(data => {
        // Simpan token akses baru
        localStorage.setItem('access', data.access);
    });
}


function saveQuizProgress(currentQuestionIndex, score) {
    isAccessTokenValid().then(valid => {
        if (valid) {
            // Token akses masih valid, simpan progres kuis
            sendQuizProgress(currentQuestionIndex, score);
        } else {
            // Token akses tidak valid, coba refresh
            refreshAccessToken().then(() => {
                // Setelah refresh, simpan progres kuis
                sendQuizProgress(currentQuestionIndex, score);
            }).catch(error => {
                console.error('Error refreshing token:', error);
            });
        }
    });
}

function sendQuizProgress(currentQuestionIndex, score) {
    const accessToken = localStorage.getItem('access');
    fetch('http://localhost:8000/api/quiz-progress/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify({ current_question_index: currentQuestionIndex, score: score }),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error('Failed to save progress: ' + JSON.stringify(err));
            });
        }
        return response.json(); // Mengembalikan data respons jika berhasil
    })
    .then(data => {
        console.log('Progress saved successfully:', data);
        // Anda bisa menambahkan logika tambahan di sini, seperti memberi tahu pengguna bahwa progres telah disimpan
    })
    .catch(error => {
        console.error('Error:', error);
        // Anda bisa menambahkan logika untuk menangani kesalahan, seperti menampilkan pesan kesalahan kepada pengguna
    });
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
    
    // Reset to initial HTML structure
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.innerHTML = `
        <div id="quiz-start" class="quiz-start">
            <button id="start-btn" class="quiz-btn">START</button>
        </div>
        
        <div id="quiz-content" style="display: none;">
            <div id="quiz-info">
                <span id="question-number">Pertanyaan 1 dari 10</span>
                <span id="timer">Waktu: 30 detik</span>
            </div>
            <div id="progress-bar" class="progress-bar">
                <div id="progress" class="progress"></div>
            </div>
            <div id="flashcard" class="flashcard">
                <div id="question" class="question-text"></div>
                <div id="options" class="options-container"></div>
                <div id="result" class="result-message"></div>
            </div>
        </div>
    `;

    // Re-attach event listener to the new start button
    const startButton = document.getElementById('start-btn');
    const quizContent = document.getElementById('quiz-content');
    const quizStart = document.getElementById('quiz-start');

    startButton.addEventListener('click', function() {
        quizStart.style.display = 'none';
        quizContent.style.display = 'block';
        loadQuestions();
    });
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

