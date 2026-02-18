import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title is required!');
      return;
    }
    setLoading(true);
    await onAdd({ title: title.trim(), description: description.trim() });
    setTitle('');
    setDescription('');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputRow}>
        <input
          type="text"
          placeholder="✏️  What needs to be done? (required)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="📝  Add a description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
          disabled={loading}
        />
        <button type="submit" style={styles.addBtn} disabled={loading}>
          {loading ? '...' : '+ Add'}
        </button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    background: '#ffffff',
    borderRadius: '14px',
    padding: '20px 24px',
    marginBottom: '20px',
    boxShadow: '0 4px 20px rgba(79, 134, 247, 0.1)',
    border: '1px solid #e0e8ff',
  },
  inputRow: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1.5px solid #d0dbff',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    minWidth: '180px',
    background: '#f8faff',
  },
  addBtn: {
    padding: '10px 24px',
    background: 'linear-gradient(135deg, #4f86f7, #3b6fd4)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    boxShadow: '0 2px 8px rgba(79,134,247,0.3)',
  },
};

export default TodoForm;
