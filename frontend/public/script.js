let todos = [];              // Seznam vseh nalog pridobljenih iz API-ja
let editingId = null;        // ID naloge, ki jo trenutno urejamo (null = dodajanje nove)
let currentFilter = 'all';   // Trenutni filter prikaza ('all', 'active', 'completed')
let deleteTodoId = null;     // ID naloge, ki je označena za brisanje (pred potrditvijo)
let currentCalendarDate = new Date(); // Trenutni datum za koledarski prikaz


// Pridobivanje referenc

const todoForm = document.getElementById('todoForm');
const todoTitle = document.getElementById('todoTitle');
const todoDescription = document.getElementById('todoDescription');
const todoDeadline = document.getElementById('todoDeadline');
const submitBtn = document.getElementById('submitBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const todosList = document.getElementById('todosList');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const errorText = document.getElementById('errorText');
const emptyState = document.getElementById('emptyState');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const todoStats = document.getElementById('todoStats');
const titleCharCount = document.getElementById('titleCharCount');
const descCharCount = document.getElementById('descCharCount');
const deleteModal = document.getElementById('deleteModal');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const calendarBtn = document.getElementById('calendarBtn');
const calendarModal = document.getElementById('calendarModal');
const closeCalendarBtn = document.getElementById('closeCalendarBtn');
const calendarContainer = document.getElementById('calendarContainer');
const calendarMonthYear = document.getElementById('calendarMonthYear');
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');
const dayTasksModal = document.getElementById('dayTasksModal');
const closeDayTasksBtn = document.getElementById('closeDayTasksBtn');
const dayTasksDate = document.getElementById('dayTasksDate');
const dayTasksList = document.getElementById('dayTasksList');
const dayTasksEmpty = document.getElementById('dayTasksEmpty');

// Osnova API-ja
const API_BASE = '/api/todos';

/**
 * Splošna funkcija za klic API-ja
 * Obravnava napak in standardne nastavitve
 */
async function apiCall(endpoint, options = {}) {
    try {
        const response = await fetch(endpoint, {
            headers: { 'Content-Type': 'application/json', ...options.headers },
            ...options
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// Nalaganje podatkov iz API-ja
async function loadTodos() {
    try {
        showLoading();
        hideError();
        todos = await apiCall(API_BASE);
        displayTodos();
        updateStats();
        // Posodobi koledar, če je odprt
        if (calendarModal && calendarModal.style.display === 'flex') {
            renderCalendar();
        }
    } catch (error) {
        showError('Napaka pri nalaganju nalog: ' + error.message);
    }
}

// Prikaz nalog glede na filter in iskalni niz
function displayTodos() {
    hideLoading();

    const searchTerm = searchInput.value.toLowerCase();

    const filteredTodos = todos.filter(todo => {
        const matchesSearch =
            todo.title.toLowerCase().includes(searchTerm) ||
            (todo.description && todo.description.toLowerCase().includes(searchTerm));

        const matchesFilter =
            currentFilter === 'all' ||
            (currentFilter === 'active' && !todo.completed) ||
            (currentFilter === 'completed' && todo.completed);

        return matchesSearch && matchesFilter;
    });

    if (filteredTodos.length === 0) {
        todos.length === 0 ? showEmptyState() : showNoResults();
        return;
    }

    hideEmptyStates();

    // Generiranje HTML-ja za prikaz nalog
    todosList.innerHTML = filteredTodos.map(todo => {
        const deadlineClass = todo.deadline && new Date(todo.deadline) < new Date() && !todo.completed ? 'deadline-overdue' : '';
        const deadlineDisplay = todo.deadline ? `<span class="todo-deadline ${deadlineClass}"><i class="fas fa-calendar-alt"></i> Rok: ${formatDate(todo.deadline)}</span>` : '';
        return `
        <div class="todo-item ${todo.completed ? 'completed' : ''}" id="todo-${todo.id}">
            <div class="todo-checkbox">
                <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todo.id})">
            </div>

            <div class="todo-content">
                <div class="todo-title">${escapeHtml(todo.title)}</div>
                ${todo.description ? `<div class="todo-description">${escapeHtml(todo.description)}</div>` : ''}
                ${deadlineDisplay}
                <div class="todo-meta">
                    <span>Ustvarjeno: ${formatDate(todo.createdAt)}</span>
                    ${todo.updatedAt !== todo.createdAt ? `<span>Posodobljeno: ${formatDate(todo.updatedAt)}</span>` : ''}
                </div>
            </div>

            <div class="todo-actions">
                <button class="btn btn-warning" onclick="editTodo(${todo.id})" ${todo.completed ? 'disabled' : ''}>
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" onclick="showDeleteModal(${todo.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    }).join('');
}

// Obdelava oddaje obrazca (dodajanje ali posodabljanje naloge)
async function handleSubmit(event) {
    event.preventDefault();

    const title = todoTitle.value.trim();
    const description = todoDescription.value.trim();
    
    // Convert datetime-local v ISO format za backend
    let deadline = null;
    if (todoDeadline.value) {
        // datetime-local vrne "YYYY-MM-DDTHH:mm"
        const date = new Date(todoDeadline.value);
        deadline = date.toISOString();
    }

    if (!title) {
        showError('Vnesite naslov naloge');
        todoTitle.focus();
        return;
    }

    try {
        hideError();

        const todoData = {
            title,
            description,
            deadline: deadline
        };

        if (editingId) {
            // Posodobitev obstoječe naloge
            todoData.completed = todos.find(t => t.id === editingId)?.completed || false;
            await apiCall(`${API_BASE}/${editingId}`, {
                method: 'PUT',
                body: JSON.stringify(todoData)
            });
        } else {
            // Ustvarjanje nove naloge
            todoData.completed = false;
            await apiCall(API_BASE, {
                method: 'POST',
                body: JSON.stringify(todoData)
            });
        }

        resetForm();
        await loadTodos();
    } catch (error) {
        showError('Napaka pri shranjevanju naloge: ' + error.message);
    }
}

// Preklop stanja (opravljeno / aktivno)
async function toggleTodo(id) {
    try {
        await apiCall(`${API_BASE}/${id}/toggle`, { method: 'PATCH' });
        await loadTodos();
    } catch (error) {
        showError('Napaka pri posodabljanju naloge: ' + error.message);
    }
}

// Urejanje naloge
function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    editingId = id;
    todoTitle.value = todo.title;
    todoDescription.value = todo.description || '';
    
    // Format za deadline datetime-local vnos je (YYYY-MM-DDTHH:mm)
    if (todo.deadline) {
        const deadlineDate = new Date(todo.deadline);
        const year = deadlineDate.getFullYear();
        const month = String(deadlineDate.getMonth() + 1).padStart(2, '0');
        const day = String(deadlineDate.getDate()).padStart(2, '0');
        const hours = String(deadlineDate.getHours()).padStart(2, '0');
        const minutes = String(deadlineDate.getMinutes()).padStart(2, '0');
        todoDeadline.value = `${year}-${month}-${day}T${hours}:${minutes}`;
    } else {
        todoDeadline.value = '';
    }
    
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Shrani spremembe';
    cancelEditBtn.style.display = 'flex';
    todoTitle.focus();
    updateCharCounts();
}

// Preklic urejanja
function cancelEdit() {
    resetForm();
}

// Ponastavitev obrazca v začetno stanje
function resetForm() {
    editingId = null;
    todoForm.reset();
    submitBtn.innerHTML = '<i class="fas fa-plus"></i> Dodaj nalogo';
    cancelEditBtn.style.display = 'none';
    updateCharCounts();
}

// Brisanje z
function showDeleteModal(id) {
    deleteTodoId = id;
    deleteModal.style.display = 'flex';
}

async function confirmDelete() {
    if (!deleteTodoId) return;

    try {
        await apiCall(`${API_BASE}/${deleteTodoId}`, { method: 'DELETE' });
        hideDeleteModal();
        await loadTodos();
    } catch (error) {
        showError('Napaka pri brisanju naloge: ' + error.message);
        hideDeleteModal();
    }
}

function hideDeleteModal() {
    deleteModal.style.display = 'none';
    deleteTodoId = null;
}

// Filtriranje in iskanje
function setFilter(filter) {
    currentFilter = filter;
    filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === filter));
    displayTodos();
}

// Iskanje po naslovu
function handleSearch() {
    displayTodos();
}

// prikaz statistike nalog
function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;

    todoStats.textContent = `${active} aktivnih, ${completed} opravljenih, ${total} skupaj`;
}

// Spremljanje dolžine vnosa
function updateCharCounts() {
    titleCharCount.textContent = `${todoTitle.value.length}/100`;
    descCharCount.textContent = `${todoDescription.value.length}/500`;
}

// Pomožne funkcije
function escapeHtml(unsafe) {
    return unsafe.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('sl-SI') + ' ' + date.toLocaleTimeString('sl-SI');
}

// UI nadzor prikaza
function showLoading() { loading.style.display = 'block'; todosList.innerHTML = ''; hideEmptyStates(); }
function hideLoading() { loading.style.display = 'none'; }
function showError(msg) { errorText.textContent = msg; error.style.display = 'flex'; }
function hideError() { error.style.display = 'none'; }
function showEmptyState() { emptyState.style.display = 'block'; noResults.style.display = 'none'; todosList.innerHTML = ''; }
function showNoResults() { noResults.style.display = 'block'; emptyState.style.display = 'none'; todosList.innerHTML = ''; }
function hideEmptyStates() { emptyState.style.display = 'none'; noResults.style.display = 'none'; }

// -----------------------
// NOVO: Drag & Drop funkcionalnost za reschedule
// -----------------------

/**
 * Prestavi nalogo na nov datum preko API-ja.
 * Uporablja se pri drag & drop v koledarju.
 * ALTERNATIVNA METODA: Uporabi obstoječ PUT /api/todos/{id} endpoint
 */
async function handleReschedule(taskId, newDate) {
    console.log('handleReschedule called:', { taskId, newDate }); // DEBUG

    try {
        // Najprej pridobi trenutno nalogo
        const todoResponse = await fetch(`${API_BASE}/${taskId}`);
        if (!todoResponse.ok) {
            throw new Error('Naloga ne obstaja');
        }

        const todo = await todoResponse.json();
        console.log('Current todo:', todo); // DEBUG

        // Ohrani originalno uro in minute, če obstaja deadline
        let newDeadline;
        if (todo.deadline) {
            const oldDeadline = new Date(todo.deadline);
            const hours = String(oldDeadline.getHours()).padStart(2, '0');
            const minutes = String(oldDeadline.getMinutes()).padStart(2, '0');
            const seconds = String(oldDeadline.getSeconds()).padStart(2, '0');
            // Uporabi nov datum z originalno uro
            const dateObj = new Date(newDate + `T${hours}:${minutes}:${seconds}`);
            newDeadline = dateObj.toISOString();
        } else {
            // Če ni deadline-ja, nastavi privzeti čas na 12:00:00
            const dateObj = new Date(newDate + 'T12:00:00');
            newDeadline = dateObj.toISOString();
        }

        // Posodobi deadline
        todo.deadline = newDeadline;

        console.log('Sending update request:', { taskId, newDeadline: newDeadline }); // DEBUG

        // Uporabi obstoječ PUT /api/todos/{id} endpoint
        const response = await fetch(`${API_BASE}/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });

        console.log('Response status:', response.status); // DEBUG

        if (response.ok) {
            const result = await response.json();
            console.log('Reschedule success:', result); // DEBUG

            // POMEMBNO: Ponovno naloži VSE naloge (ne samo koledar)
            await loadTodos(); // To bo osvežilo tudi glavni seznam nalog

            // Prikaži obvestilo
            showNotification('Opravilo prestavljeno!', 'success');
        } else {
            const errorMsg = await response.text();
            console.error('Reschedule error:', errorMsg); // DEBUG
            showNotification('Napaka pri prestavitvi: ' + errorMsg, 'error');
        }
    } catch (error) {
        console.error('Napaka pri reschedule:', error);
        showNotification('Napaka pri komunikaciji s strežnikom', 'error');
    }
}

/**
 * Prikaže toast notification sporočilo.
 */
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Koledarski prikaz
async function showCalendar() {
    currentCalendarDate = new Date();
    calendarModal.style.display = 'flex';
    await renderCalendar();
}

function hideCalendar() {
    calendarModal.style.display = 'none';
}

async function renderCalendar() {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth() + 1; // JavaScript meseci so 0-based, backend sprememba zaradi backenda v 1-12
    
    // Nastavi naslov meseca
    const monthNames = ['Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij', 
                       'Julij', 'Avgust', 'September', 'Oktober', 'November', 'December'];
    calendarMonthYear.textContent = `${monthNames[month - 1]} ${year}`;
    
    // Prvi dan v mesecu
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 = nedelja, 1 = ponedeljek, ...
    
    // 0 = ponedeljek
    const adjustedStartingDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;
    
    // Pridobi naloge za trenutni mesec iz backend-a
    let monthTodos = [];
    try {
        monthTodos = await apiCall(`${API_BASE}/calendar?year=${year}&month=${month}`);
    } catch (error) {
        console.error('Error loading calendar todos:', error);
        showError('Napaka pri nalaganju koledarskih podatkov: ' + error.message);
    }
    
    // Ustvari koledar
    let calendarHTML = '<div class="calendar-grid">';
    
    // Dnevi v tednu skrajšani
    const dayNames = ['Pon', 'Tor', 'Sre', 'Čet', 'Pet', 'Sob', 'Ned'];
    calendarHTML += '<div class="calendar-weekdays">';
    dayNames.forEach(day => {
        calendarHTML += `<div class="calendar-weekday">${day}</div>`;
    });
    calendarHTML += '</div>';
    
    // Prazne celice za prvi dan
    calendarHTML += '<div class="calendar-days">';
    for (let i = 0; i < adjustedStartingDay; i++) {
        calendarHTML += '<div class="calendar-day empty"></div>';
    }
    
    // Dnevi v mesecu
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month - 1, day); // month - 1 ker je JavaScript 0-based
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        const dayTodos = monthTodos.filter(todo => {
            const deadlineDate = new Date(todo.deadline);
            return deadlineDate.getDate() === day;
        });
        
        const isToday = currentDate.toDateString() === new Date().toDateString();
        const isPast = currentDate < new Date() && !isToday;
        
        calendarHTML += `<div class="calendar-day ${isToday ? 'today' : ''} ${isPast ? 'past' : ''}" data-date="${dateStr}">`;
        calendarHTML += `<div class="calendar-day-number">${day}</div>`;
        
        if (dayTodos.length > 0) {
            calendarHTML += '<div class="calendar-todos">';
            dayTodos.slice(0, 3).forEach(todo => {
                const overdue = new Date(todo.deadline) < new Date() && !todo.completed;
                calendarHTML += `<div class="calendar-todo ${todo.completed ? 'completed' : ''} ${overdue ? 'overdue' : ''}" 
                                     draggable="true" 
                                     data-task-id="${todo.id}" 
                                     title="${escapeHtml(todo.title)}">`;
                calendarHTML += `<i class="fas ${todo.completed ? 'fa-check-circle' : 'fa-circle'}"></i>`;
                calendarHTML += `<span>${escapeHtml(todo.title.length > 15 ? todo.title.substring(0, 15) + '...' : todo.title)}</span>`;
                calendarHTML += '</div>';
            });
            if (dayTodos.length > 3) {
                calendarHTML += `<div class="calendar-todo-more">+${dayTodos.length - 3} več</div>`;
            }
            calendarHTML += '</div>';
        }
        
        calendarHTML += '</div>';
    }
    
    calendarHTML += '</div></div>';
    calendarContainer.innerHTML = calendarHTML;

    // Dodan drag and drop event listener
    setupDragAndDrop();
    
    // Dodaj event listener-je za klik na dan
    setupDayClickListeners();
}

/**
 * Nastavi drag & drop event listener-je za koledar.
 */
function setupDragAndDrop() {
    const taskElements = calendarContainer.querySelectorAll('.calendar-todo[draggable="true"]');
    const dayElements = calendarContainer.querySelectorAll('.calendar-day:not(.empty)');

    console.log('setupDragAndDrop:', { // DEBUG
        taskCount: taskElements.length,
        dayCount: dayElements.length
    });

    // Nastavi event listener-je za vlečenje nalog
    taskElements.forEach(taskEl => {
        taskEl.addEventListener('dragstart', (e) => {
            console.log('dragstart:', taskEl.dataset.taskId); // DEBUG
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', taskEl.dataset.taskId);
            taskEl.classList.add('dragging');
        });

        taskEl.addEventListener('dragend', (e) => {
            console.log('dragend'); // DEBUG
            taskEl.classList.remove('dragging');
        });
    });

    // Nastavi event listener-je za spuščanje nalog na dneve
    dayElements.forEach(dayEl => {
        dayEl.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            dayEl.classList.add('drag-over');
        });

        dayEl.addEventListener('dragleave', (e) => {
            // Preveri, če smo res zapustili element (ne zgolj otroke)
            if (!dayEl.contains(e.relatedTarget)) {
                dayEl.classList.remove('drag-over');
            }
        });

        dayEl.addEventListener('drop', (e) => {
            e.preventDefault();
            dayEl.classList.remove('drag-over');

            const taskId = e.dataTransfer.getData('text/plain');
            const newDate = dayEl.dataset.date;

            console.log('drop event:', { taskId, newDate }); // DEBUG

            if (taskId && newDate) {
                handleReschedule(taskId, newDate);
            } else {
                console.error('Missing taskId or newDate:', { taskId, newDate }); // DEBUG
            }
        });
    });
}

async function changeMonth(direction) {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + direction);
    await renderCalendar();
}

/**
 * Nastavi event listener-je za klik na dneve v koledarju.
 * Ko uporabnik klikne na dan, se odpre modal z nalogami za ta dan.
 */
function setupDayClickListeners() {
    const dayElements = calendarContainer.querySelectorAll('.calendar-day:not(.empty)');
    
    dayElements.forEach(dayEl => {
        // Prepreči, da bi klik na nalogo odprl modal (ker je naloga draggable)
        dayEl.addEventListener('click', (e) => {
            // Če je klik na nalogo ali njen element, ne odpri modal
            if (e.target.closest('.calendar-todo')) {
                return;
            }
            
            const dateStr = dayEl.dataset.date;
            if (dateStr) {
                showDayTasks(dateStr);
            }
        });
    });
}

/**
 * Prikaže modal z vsemi nalogami za izbrani dan.
 * Naloge so razvrščene po času roka.
 * @param {string} dateStr - Datum v formatu "YYYY-MM-DD"
 */
async function showDayTasks(dateStr) {
    try {
        // Prikaži modal
        dayTasksModal.style.display = 'flex';
        
        // Formatiraj datum za prikaz
        const date = new Date(dateStr + 'T12:00:00');
        const dateFormatted = date.toLocaleDateString('sl-SI', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        dayTasksDate.textContent = dateFormatted;
        
        // Filtriraj naloge za izbrani dan
        const dayTodos = todos.filter(todo => {
            if (!todo.deadline) return false;
            
            const deadlineDate = new Date(todo.deadline);
            const deadlineDateStr = `${deadlineDate.getFullYear()}-${String(deadlineDate.getMonth() + 1).padStart(2, '0')}-${String(deadlineDate.getDate()).padStart(2, '0')}`;
            
            return deadlineDateStr === dateStr;
        });
        
        // Razvrsti naloge po času roka (najprej najzgodnejše)
        dayTodos.sort((a, b) => {
            const timeA = new Date(a.deadline).getTime();
            const timeB = new Date(b.deadline).getTime();
            return timeA - timeB;
        });
        
        // Prikaži naloge ali prazno stanje
        if (dayTodos.length === 0) {
            dayTasksList.style.display = 'none';
            dayTasksEmpty.style.display = 'block';
        } else {
            dayTasksEmpty.style.display = 'none';
            dayTasksList.style.display = 'block';
            
            // Generiraj HTML za naloge
            dayTasksList.innerHTML = dayTodos.map(todo => {
                const deadlineDate = new Date(todo.deadline);
                const timeStr = deadlineDate.toLocaleTimeString('sl-SI', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
                const overdue = deadlineDate < new Date() && !todo.completed;
                
                return `
                    <div class="day-task-item ${todo.completed ? 'completed' : ''} ${overdue ? 'overdue' : ''}">
                        <div class="day-task-time">
                            <i class="fas fa-clock"></i>
                            ${timeStr}
                        </div>
                        <div class="day-task-content">
                            <div class="day-task-title">${escapeHtml(todo.title)}</div>
                            ${todo.description ? `<div class="day-task-description">${escapeHtml(todo.description)}</div>` : ''}
                        </div>
                        <div class="day-task-status">
                            ${todo.completed ? '<i class="fas fa-check-circle" style="color: #10b981;"></i>' : '<i class="fas fa-circle" style="color: #64748b;"></i>'}
                        </div>
                    </div>
                `;
            }).join('');
        }
    } catch (error) {
        console.error('Napaka pri prikazu nalog za dan:', error);
        showError('Napaka pri nalaganju nalog za izbrani dan: ' + error.message);
    }
}

/**
 * Skrije modal z nalogami za dan.
 */
function hideDayTasks() {
    dayTasksModal.style.display = 'none';
}

// Dogodki
document.addEventListener('DOMContentLoaded', function() {
    loadTodos();
    todoForm.addEventListener('submit', handleSubmit);
    cancelEditBtn.addEventListener('click', cancelEdit);
    searchInput.addEventListener('input', handleSearch);
    filterButtons.forEach(btn => btn.addEventListener('click', () => setFilter(btn.dataset.filter)));
    todoTitle.addEventListener('input', updateCharCounts);
    todoDescription.addEventListener('input', updateCharCounts);
    confirmDeleteBtn.addEventListener('click', confirmDelete);
    cancelDeleteBtn.addEventListener('click', hideDeleteModal);
    calendarBtn.addEventListener('click', showCalendar);
    closeCalendarBtn.addEventListener('click', hideCalendar);
    prevMonthBtn.addEventListener('click', () => changeMonth(-1));
    nextMonthBtn.addEventListener('click', () => changeMonth(1));
    closeDayTasksBtn.addEventListener('click', hideDayTasks);

    deleteModal.addEventListener('click', e => { if (e.target === deleteModal) hideDeleteModal(); });
    calendarModal.addEventListener('click', e => { if (e.target === calendarModal) hideCalendar(); });
    dayTasksModal.addEventListener('click', e => { if (e.target === dayTasksModal) hideDayTasks(); });

    window.hideError = hideError; // omogoča zapiranje napak iz HTML-ja
    updateCharCounts();
});

// Bližnjice na tipkovnici
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        if (editingId) cancelEdit();
        if (deleteModal.style.display === 'flex') hideDeleteModal();
        if (calendarModal.style.display === 'flex') hideCalendar();
        if (dayTasksModal.style.display === 'flex') hideDayTasks();
    }

    // Ctrl+K / Cmd+K → fokus na iskanje
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        searchInput.focus();
    }
});
