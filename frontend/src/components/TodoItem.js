import { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.description || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!editTitle.trim()) {
      alert('Title is required!');
      return;
    }
    setSaving(true);
    await onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDesc.trim(),
    });
    setSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDesc(todo.description || '');
    setIsEditing(false);
  };

  const formattedDate = new Date(todo.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      style={{
        ...styles.card,
        borderLeft: `4px solid ${todo.completed ? '#10b981' : '#4f86f7'}`,
        opacity: todo.completed ? 0.75 : 1,
      }}
    >
      {isEditing ? (
        /* ── EDIT MODE ── */
        <div style={styles.editArea}>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={styles.editInput}
            placeholder="Title *"
            autoFocus
          />
          <input
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            style={styles.editInput}
            placeholder="Description"
          />
          <div style={styles.editActions}>
            <button onClick={handleSave} style={styles.saveBtn} disabled={saving}>
              {saving ? 'Saving...' : '✅ Save'}
            </button>
            <button onClick={handleCancel} style={styles.cancelBtn}>
              ✖ Cancel
            </button>
          </div>
        </div>
      ) : (
        /* ── VIEW MODE ── */
        <div style={styles.viewArea}>
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id, todo.completed)}
            style={styles.checkbox}
            title={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
          />

          {/* Content */}
          <div style={styles.content}>
            <p
              style={{
                ...styles.title,
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#888' : '#1a1a2e',
              }}
            >
              {todo.title}
            </p>
            {todo.description && (
              <p style={styles.desc}>{todo.description}</p>
            )}
            <p style={styles.date}>📅 {formattedDate}</p>
          </div>

          {/* Status badge */}
          <span
            style={{
              ...styles.badge,
              background: todo.completed ? '#d1fae5' : '#e0e8ff',
              color: todo.completed ? '#065f46' : '#1e40af',
            }}
          >
            {todo.completed ? '✓ Done' : '○ Active'}
          </span>

          {/* Action Buttons */}
          <div style={styles.btnGroup}>
            <button
              onClick={() => setIsEditing(true)}
              style={styles.editBtn}
              title="Edit"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              style={styles.deleteBtn}
              title="Delete"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '16px 20px',
    marginBottom: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    transition: 'box-shadow 0.2s, transform 0.1s',
  },
  viewArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    flexWrap: 'wrap',
  },
  editArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    accentColor: '#4f86f7',
    flexShrink: 0,
  },
  content: {
    flex: 1,
    minWidth: '120px',
  },
  title: {
    fontSize: '15px',
    fontWeight: '600',
    margin: '0 0 3px',
  },
  desc: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '0 0 4px',
  },
  date: {
    fontSize: '11px',
    color: '#9ca3af',
    margin: 0,
  },
  badge: {
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  btnGroup: {
    display: 'flex',
    gap: '8px',
    flexShrink: 0,
  },
  editBtn: {
    padding: '6px 14px',
    background: '#fff7ed',
    color: '#c2410c',
    border: '1px solid #fed7aa',
    borderRadius: '7px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
  },
  deleteBtn: {
    padding: '6px 14px',
    background: '#fff1f2',
    color: '#be123c',
    border: '1px solid #fecdd3',
    borderRadius: '7px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
  },
  editInput: {
    padding: '8px 12px',
    borderRadius: '7px',
    border: '1.5px solid #d0dbff',
    fontSize: '14px',
    outline: 'none',
    background: '#f8faff',
  },
  editActions: {
    display: 'flex',
    gap: '8px',
  },
  saveBtn: {
    padding: '7px 18px',
    background: '#10b981',
    color: '#fff',
    border: 'none',
    borderRadius: '7px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px',
  },
  cancelBtn: {
    padding: '7px 18px',
    background: '#f3f4f6',
    color: '#374151',
    border: '1px solid #d1d5db',
    borderRadius: '7px',
    cursor: 'pointer',
    fontSize: '13px',
  },
};

export default TodoItem;
