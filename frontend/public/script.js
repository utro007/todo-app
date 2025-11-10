// Global state
let todos = [];
let editingId = null;
let currentFilter = 'all';
let deleteTodoId = null;

// DOM elements
const todoForm = document.getElementById('todoForm');
const todoTitle = document.getElementById('todoTitle');
const todoDescription = document.getElementById('todoDescription');
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

// API
const API_BASE = '/api/todos';

async function apiCall(endpoint, options = {}) {
    try {
        const response = await fetch(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// Load all todos
async function loadTodos() {
    try {
        showLoading();
        hideError();

        todos = await apiCall(API_BASE);
        displayTodos();
        updateStats();
    } catch (error) {
        showError('Napaka pri nalaganju nalog: ' + error.message);
    }
}

// Display todos based on current filter and search
function displayTodos() {
    hideLoading();

    const searchTerm = searchInput.value.toLowerCase();
    let filteredTodos = todos.filter(todo => {
        const matchesSearch = todo.title.toLowerCase().includes(searchTerm) ||
            (todo.description && todo.description.toLowerCase().includes(searchTerm));
        const matchesFilter = currentFilter === 'all' ||
            (currentFilter === 'active' && !todo.completed) ||
            (currentFilter === 'completed' && todo.completed);

        return matchesSearch && matchesFilter;
    });

    if (filteredTodos.length === 0) {
        if (todos.length === 0) {
            showEmptyState();
        } else {
            showNoResults();
        }
        return;
    }

    hideEmptyStates();

    todosList.innerHTML = filteredTodos.map(todo => `
        <div class="todo-item ${todo.completed ? 'completed' : ''}" id="todo-${todo.id}">
            <div class="todo-checkbox">
                <input 
                    type="checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    onchange="toggleTodo(${todo.id})"
                >
            </div>
            <div class="todo-content">
                <div class="todo-title">${escapeHtml(todo.title)}</div>
                ${todo.description ? `<div class="todo-description">${escapeHtml(todo.description)}</div>` : ''}
                <div class="todo-meta">
                    <span>Ustvarjeno: ${formatDate(todo.createdAt)}</span>
                    ${todo.updatedAt !== todo.createdAt ?
        `<span>Posodobljeno: ${formatDate(todo.updatedAt)}</span>` : ''}
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
    `).join('');
}

// Add or update todo
async function handleSubmit(event) {
    event.preventDefault();

    const title = todoTitle.value.trim();
    const description = todoDescription.value.trim();

    if (!title) {
        showError('Vnesite naslov naloge');
        todoTitle.focus();
        return;
    }

    try {
        hideError();

        if (editingId) {
            // Update existing todo
            await apiCall(`${API_BASE}/${editingId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title,
                    description,
                    completed: todos.find(t => t.id === editingId)?.completed || false
                })
            });
        } else {
            // Create new todo
            await apiCall(API_BASE, {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    description,
                    completed: false
                })
            });
        }

        resetForm();
        await loadTodos();
    } catch (error) {
        showError('Napaka pri shranjevanju naloge: ' + error.message);
    }
}

// Toggle todo completion
async function toggleTodo(id) {
    try {
        await apiCall(`${API_BASE}/${id}/toggle`, {
            method: 'PATCH'
        });
        await loadTodos();
    } catch (error) {
        showError('Napaka pri posodabljanju naloge: ' + error.message);
    }
}

// Edit todo
function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    editingId = id;
    todoTitle.value = todo.title;
    todoDescription.value = todo.description || '';
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Shrani spremembe';
    cancelEditBtn.style.display = 'flex';
    todoTitle.focus();

    updateCharCounts();
}

// Cancel editing
function cancelEdit() {
    resetForm();
}

// Reset form
function resetForm() {
    editingId = null;
    todoForm.reset();
    submitBtn.innerHTML = '<i class="fas fa-plus"></i> Dodaj nalogo';
    cancelEditBtn.style.display = 'none';
    updateCharCounts();
}

// Delete todo with confirmation
function showDeleteModal(id) {
    deleteTodoId = id;
    deleteModal.style.display = 'flex';
}

async function confirmDelete() {
    if (!deleteTodoId) return;

    try {
        await apiCall(`${API_BASE}/${deleteTodoId}`, {
            method: 'DELETE'
        });
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

// Filter todos
function setFilter(filter) {
    currentFilter = filter;

    // Update active filter button
    filterButtons.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    displayTodos();
}

// Search todos
function handleSearch() {
    displayTodos();
}

// Update statistics
function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;

    todoStats.textContent = `${active} aktivnih, ${completed} opravljenih, ${total} skupaj`;
}

// Character count
function updateCharCounts() {
    titleCharCount.textContent = `${todoTitle.value.length}/100`;
    descCharCount.textContent = `${todoDescription.value.length}/500`;
}

// Utility functions
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('sl-SI') + ' ' + date.toLocaleTimeString('sl-SI');
}

// UI state functions
function showLoading() {
    loading.style.display = 'block';
    todosList.innerHTML = '';
    hideEmptyStates();
}

function hideLoading() {
    loading.style.display = 'none';
}

function showError(message) {
    errorText.textContent = message;
    error.style.display = 'flex';
}

function hideError() {
    error.style.display = 'none';
}

function showEmptyState() {
    emptyState.style.display = 'block';
    noResults.style.display = 'none';
    todosList.innerHTML = '';
}

function showNoResults() {
    noResults.style.display = 'block';
    emptyState.style.display = 'none';
    todosList.innerHTML = '';
}

function hideEmptyStates() {
    emptyState.style.display = 'none';
    noResults.style.display = 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load initial data
    loadTodos();

    // Form submission
    todoForm.addEventListener('submit', handleSubmit);

    // Cancel edit
    cancelEditBtn.addEventListener('click', cancelEdit);

    // Search
    searchInput.addEventListener('input', handleSearch);

    // Filters
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => setFilter(btn.dataset.filter));
    });

    // Character counts
    todoTitle.addEventListener('input', updateCharCounts);
    todoDescription.addEventListener('input', updateCharCounts);

    // Delete modal
    confirmDeleteBtn.addEventListener('click', confirmDelete);
    cancelDeleteBtn.addEventListener('click', hideDeleteModal);

    // Close modal on outside click
    deleteModal.addEventListener('click', function(event) {
        if (event.target === deleteModal) {
            hideDeleteModal();
        }
    });

    // Close error message
    window.hideError = hideError;

    // Initial character count
    updateCharCounts();
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Escape key cancels edit or closes modal
    if (event.key === 'Escape') {
        if (editingId) {
            cancelEdit();
        }
        if (deleteModal.style.display === 'flex') {
            hideDeleteModal();
        }
    }

    // Ctrl+K or Cmd+K focuses search
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        searchInput.focus();
    }
});