import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../features/store/store';
import { notesPath } from '../../lib/paths';
import { Button } from '../ui/Button';

export interface ReaderNotesProps {
  sectionId: string;
}

export const ReaderNotes: React.FC<ReaderNotesProps> = ({ sectionId }) => {
  const { store, setNote, deleteNote } = useStore();
  const existingNote = store.notes[sectionId];

  const [text, setText] = useState<string>(existingNote?.text || '');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'unsaved' | 'idle'>(
    existingNote ? 'saved' : 'idle'
  );
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(
    existingNote ? formatTime(existingNote.updatedAt) : null
  );
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const debounceTimerRef = useRef<number | null>(null);
  const currentSectionRef = useRef<string>(sectionId);

  // Sync draft when sectionId changes or external store updates
  useEffect(() => {
    if (currentSectionRef.current !== sectionId) {
      currentSectionRef.current = sectionId;
      if (debounceTimerRef.current !== null) {
        window.clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
      const note = store.notes[sectionId];
      setText(note?.text || '');
      setSaveStatus(note ? 'saved' : 'idle');
      setLastSavedTime(note ? formatTime(note.updatedAt) : null);
      setConfirmDelete(false);
    }
  }, [sectionId, store.notes]);

  function formatTime(isoString?: string): string {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      const hours = d.getHours().toString().padStart(2, '0');
      const mins = d.getMinutes().toString().padStart(2, '0');
      return `${hours}:${mins}`;
    } catch {
      return '';
    }
  }

  const handleSave = (content: string) => {
    if (debounceTimerRef.current !== null) {
      window.clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    const trimmed = content.trim();
    if (!trimmed) {
      deleteNote(sectionId);
      setSaveStatus('idle');
      setLastSavedTime(null);
    } else {
      setNote(sectionId, content);
      setSaveStatus('saved');
      setLastSavedTime(formatTime(new Date().toISOString()));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const nextVal = e.target.value;
    setText(nextVal);
    setSaveStatus('unsaved');
    setConfirmDelete(false);

    if (debounceTimerRef.current !== null) {
      window.clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = window.setTimeout(() => {
      handleSave(nextVal);
    }, 800);
  };

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    if (debounceTimerRef.current !== null) {
      window.clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    deleteNote(sectionId);
    setText('');
    setSaveStatus('idle');
    setLastSavedTime(null);
    setConfirmDelete(false);
  };

  const hasNote = Boolean(existingNote?.text || text.trim());

  return (
    <aside
      className="reader-notes-region"
      aria-label="本节学习笔记"
      style={{
        marginTop: '32px',
        padding: '16px 20px',
        background: 'var(--bg-subtle, #fcfcfb)',
        border: '1px solid var(--border, #e5e5e0)',
        borderRadius: '6px',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <strong style={{ fontSize: '13px', color: 'var(--ink)' }}>本节笔记</strong>
          <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>
            {saveStatus === 'unsaved' && '未保存'}
            {saveStatus === 'saved' && (lastSavedTime ? `已保存 ${lastSavedTime}` : '已保存')}
            {saveStatus === 'idle' && !hasNote && '自动保存'}
          </span>
        </div>

        <Link
          to={notesPath()}
          style={{
            fontSize: '11px',
            color: 'var(--accent, #1a56db)',
            textDecoration: 'none',
          }}
        >
          查看全部笔记 →
        </Link>
      </div>

      <textarea
        aria-label="本节笔记编辑区"
        value={text}
        onChange={handleChange}
        placeholder="记录推导、疑问或自己的例子……"
        rows={3}
        style={{
          width: '100%',
          padding: '10px 12px',
          fontSize: '13px',
          lineHeight: 1.6,
          fontFamily: 'var(--font-sans)',
          color: 'var(--ink)',
          background: 'var(--bg-card, #ffffff)',
          border: '1px solid var(--border, #e0e0dc)',
          borderRadius: '4px',
          resize: 'vertical',
          boxSizing: 'border-box',
          outline: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <div>
          {hasNote && (
            <button
              type="button"
              onClick={handleDelete}
              style={{
                background: 'transparent',
                border: 'none',
                color: confirmDelete ? 'var(--warning, #c9510c)' : 'var(--ink-muted)',
                fontSize: '12px',
                cursor: 'pointer',
                padding: '4px 6px',
                fontWeight: confirmDelete ? 600 : 400,
              }}
            >
              {confirmDelete ? '确认删除？' : '删除笔记'}
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => handleSave(text)}
            disabled={saveStatus === 'saved' || (!text.trim() && !hasNote)}
          >
            保存
          </Button>
        </div>
      </div>
    </aside>
  );
};
