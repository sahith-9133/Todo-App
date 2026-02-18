import { useState, useEffect, useCallback } from 'react';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from './api/todoApi';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ── Fetch todos ──
  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const completed =
        filter === 'all' ? undefined : filter === 'completed' ? true : false;
      const res = await getAllTodos(completed);
      setTodos(res.data);
    } catch (err) {
      setError('Could not connect to the backend. Make sure Spring Boot is running on port 8080.');
    }
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // ── Handlers ──
  const handleAdd = async (todoData) => {
    try {
      await createTodo(todoData);
      await fetchTodos();
    } catch (err) {
      const msg = err.response?.data?.title || err.response?.data?.error || 'Failed to add todo';
      alert(msg);
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      await updateTodo(id, { completed: !currentStatus });
      await fetchTodos();
    } catch (err) {
      console.error('Toggle failed:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;
    try {
      await deleteTodo(id);
      await fetchTodos();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateTodo(id, data);
      await fetchTodos();
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  // ── Stats ──
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = totalCount - completedCount;

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* ── Header ── */}
        <div style={styles.header}>
          <h1 style={styles.heading}>📝 Todo App</h1>
          <p style={styles.subheading}>Spring Boot + React</p>
        </div>

        {/* ── Stats Row ── */}
        <div style={styles.statsRow}>
          <div style={{ ...styles.statBox, background: '#e0e8ff', color: '#1e40af' }}>
            <span style={styles.statNum}>{totalCount}</span>
            <span style={styles.statLabel}>Total</span>
          </div>
          <div style={{ ...styles.statBox, background: '#dcfce7', color: '#166534' }}>
            <span style={styles.statNum}>{completedCount}</span>
            <span style={styles.statLabel}>Done</span>
          </div>
          <div style={{ ...styles.statBox, background: '#fef9c3', color: '#854d0e' }}>
            <span style={styles.statNum}>{activeCount}</span>
            <span style={styles.statLabel}>Active</span>
          </div>
        </div>

        {/* ── Add Form ── */}
        <TodoForm onAdd={handleAdd} />

        {/* ── Filter Tabs ── */}
        <div style={styles.filterRow}>
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterBtn,
                background: filter === f ? '#4f86f7' : '#ffffff',
                color: filter === f ? '#ffffff' : '#6b7280',
                borderColor: filter === f ? '#4f86f7' : '#e5e7eb',
                fontWeight: filter === f ? '700' : '500',
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* ── Error ── */}
        {error && (
          <div style={styles.errorBox}>
            ⚠️ {error}
          </div>
        )}

        {/* ── Todo List ── */}
        {loading ? (
          <div style={styles.center}>
            <div style={styles.spinner} />
            <p style={{ color: '#9ca3af', marginTop: '12px' }}>Loading...</p>
          </div>
        ) : todos.length === 0 && !error ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyIcon}>🎉</p>
            <p style={styles.emptyText}>
              {filter === 'all'
                ? 'No todos yet. Add one above!'
                : filter === 'active'
                ? 'No active todos!'
                : 'No completed todos yet!'}
            </p>
          </div>
        ) : (
          <div>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f4fd 100%)',
    padding: '40px 20px',
  },
  container: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '28px',
  },
  heading: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#1a1a2e',
    margin: '0 0 4px',
  },
  subheading: {
    fontSize: '14px',
    color: '#9ca3af',
    margin: 0,
  },
  statsRow: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
  },
  statBox: {
    flex: 1,
    borderRadius: '12px',
    padding: '14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  },
  statNum: {
    fontSize: '28px',
    fontWeight: '800',
  },
  statLabel: {
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  filterRow: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
  },
  filterBtn: {
    padding: '8px 20px',
    border: '1.5px solid',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    transition: 'all 0.15s',
  },
  errorBox: {
    background: '#fff1f2',
    border: '1px solid #fecdd3',
    borderRadius: '10px',
    padding: '14px 18px',
    color: '#be123c',
    marginBottom: '16px',
    fontSize: '14px',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '60px 0',
  },
  spinner: {
    width: '36px',
    height: '36px',
    border: '3px solid #e0e8ff',
    borderTop: '3px solid #4f86f7',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
  },
  emptyIcon: {
    fontSize: '48px',
    margin: '0 0 12px',
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: '16px',
  },
};

export default App;
