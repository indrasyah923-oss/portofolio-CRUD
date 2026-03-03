// src/pages/SettingPage.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Plus, Edit2, Trash2, Home, Save, X,
  Users, ChevronRight, Type, Image, AlignLeft,
  Quote, List, Minus, GripVertical, ChevronUp, ChevronDown,
  Link2, Upload
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// ── Block type definitions ────────────────────────────────────────────────────
const BLOCK_TYPES = [
  { type: 'paragraph',  icon: AlignLeft, label: 'Paragraf' },
  { type: 'heading',    icon: Type,      label: 'Judul' },
  { type: 'subheading', icon: Type,      label: 'Sub-Judul' },
  { type: 'image',      icon: Image,     label: 'Gambar' },
  { type: 'quote',      icon: Quote,     label: 'Kutipan' },
  { type: 'list',       icon: List,      label: 'Daftar' },
  { type: 'divider',    icon: Minus,     label: 'Pemisah' },
];

const defaultBlock = (type) => {
  switch (type) {
    case 'paragraph':  return { type, text: '' };
    case 'heading':    return { type, text: '' };
    case 'subheading': return { type, text: '' };
    case 'image':      return { type, url: '', caption: '' };
    case 'quote':      return { type, text: '', author: '' };
    case 'list':       return { type, items: [''] };
    case 'divider':    return { type };
    default:           return { type, text: '' };
  }
};

// ── Image Upload Field ────────────────────────────────────────────────────────
const ImageField = ({ value, onChange, placeholder = "URL gambar (https://...)" }) => {
  const [mode, setMode] = useState('url'); // 'url' | 'upload'
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Konversi ke base64 / object URL untuk preview lokal
    // Untuk production, ganti dengan upload ke server/cloudinary/etc
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (ev) => {
        onChange(ev.target.result); // base64 data URL
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {/* Toggle URL / Upload */}
      <div className="flex gap-1 p-1 bg-gray-800/50 rounded-lg w-fit">
        <button type="button" onClick={() => setMode('url')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${mode === 'url' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}>
          <Link2 size={12} /> URL
        </button>
        <button type="button" onClick={() => setMode('upload')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${mode === 'upload' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}>
          <Upload size={12} /> Upload
        </button>
      </div>

      {mode === 'url' ? (
        <input type="text" placeholder={placeholder} value={value || ''}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-gray-800/50 border border-gray-700 focus:border-purple-500 rounded-xl px-4 py-3 text-white outline-none transition-colors text-sm" />
      ) : (
        <div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          <button type="button" onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="w-full border-2 border-dashed border-gray-700 hover:border-purple-500 rounded-xl py-6 flex flex-col items-center gap-2 text-gray-500 hover:text-purple-400 transition-all">
            <Upload size={20} />
            <span className="text-xs">{uploading ? 'Memuat...' : 'Klik untuk pilih gambar'}</span>
            <span className="text-[10px] text-gray-600">JPG, PNG, WEBP</span>
          </button>
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="relative rounded-xl overflow-hidden ring-1 ring-white/10 max-h-40">
          <img src={value} alt="" className="w-full h-full object-cover"
            onError={e => e.target.style.display = 'none'} />
          <button type="button" onClick={() => onChange('')}
            className="absolute top-2 right-2 w-6 h-6 bg-black/60 hover:bg-red-500/80 rounded-full flex items-center justify-center text-white transition-colors">
            <X size={12} />
          </button>
        </div>
      )}
    </div>
  );
};

// ── Single Block Editor ───────────────────────────────────────────────────────
const BlockEditor = ({ block, index, total, onChange, onDelete, onMove }) => {
  const baseInput = "w-full bg-gray-800/50 border border-gray-700 focus:border-purple-500 rounded-xl px-4 py-3 text-white outline-none transition-colors text-sm";
  const baseMeta  = "w-full bg-gray-800/30 border border-gray-700/50 focus:border-purple-400/50 rounded-lg px-3 py-2 text-gray-300 outline-none transition-colors text-xs";
  const TypeIcon  = BLOCK_TYPES.find(b => b.type === block.type)?.icon || AlignLeft;
  const typeLabel = BLOCK_TYPES.find(b => b.type === block.type)?.label || block.type;

  return (
    <div className="group relative bg-gray-800/30 border border-gray-700/50 hover:border-gray-600/70 rounded-2xl p-4 transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <GripVertical size={14} className="text-gray-600" />
          <span className="flex items-center gap-1.5 text-[11px] text-gray-500 font-semibold uppercase tracking-wider">
            <TypeIcon size={12} className="text-purple-400" /> {typeLabel}
          </span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button type="button" onClick={() => onMove(index, -1)} disabled={index === 0}
            className="p-1 rounded-lg text-gray-600 hover:text-gray-300 disabled:opacity-30 transition-colors">
            <ChevronUp size={14} />
          </button>
          <button type="button" onClick={() => onMove(index, 1)} disabled={index === total - 1}
            className="p-1 rounded-lg text-gray-600 hover:text-gray-300 disabled:opacity-30 transition-colors">
            <ChevronDown size={14} />
          </button>
          <button type="button" onClick={() => onDelete(index)}
            className="p-1 rounded-lg text-gray-600 hover:text-red-400 transition-colors">
            <X size={14} />
          </button>
        </div>
      </div>

      {block.type === 'paragraph' && (
        <textarea rows={4} placeholder="Tulis paragraf..." value={block.text || ''}
          onChange={e => onChange(index, { ...block, text: e.target.value })}
          className={`${baseInput} resize-none`} />
      )}

      {(block.type === 'heading' || block.type === 'subheading') && (
        <input type="text"
          placeholder={block.type === 'heading' ? 'Judul bagian...' : 'Sub-judul...'}
          value={block.text || ''}
          onChange={e => onChange(index, { ...block, text: e.target.value })}
          className={baseInput} />
      )}

      {block.type === 'image' && (
        <div className="space-y-2">
          <ImageField
            value={block.url || ''}
            onChange={url => onChange(index, { ...block, url })}
            placeholder="URL gambar (https://...)"
          />
          <input type="text" placeholder="Keterangan gambar (opsional)"
            value={block.caption || ''}
            onChange={e => onChange(index, { ...block, caption: e.target.value })}
            className={baseMeta} />
        </div>
      )}

      {block.type === 'quote' && (
        <div className="space-y-2">
          <textarea rows={3} placeholder="Isi kutipan..."
            value={block.text || ''}
            onChange={e => onChange(index, { ...block, text: e.target.value })}
            className={`${baseInput} resize-none`} />
          <input type="text" placeholder="Nama sumber (opsional)"
            value={block.author || ''}
            onChange={e => onChange(index, { ...block, author: e.target.value })}
            className={baseMeta} />
        </div>
      )}

      {block.type === 'list' && (
        <div className="space-y-2">
          {(block.items || ['']).map((item, i) => (
            <div key={i} className="flex gap-2 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
              <input type="text" placeholder={`Item ${i + 1}...`} value={item}
                onChange={e => {
                  const items = [...block.items];
                  items[i] = e.target.value;
                  onChange(index, { ...block, items });
                }}
                className={baseInput} />
              <button type="button" onClick={() => {
                const items = block.items.filter((_, j) => j !== i);
                onChange(index, { ...block, items: items.length ? items : [''] });
              }} className="text-gray-600 hover:text-red-400 flex-shrink-0 transition-colors">
                <X size={14} />
              </button>
            </div>
          ))}
          <button type="button"
            onClick={() => onChange(index, { ...block, items: [...(block.items || []), ''] })}
            className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 mt-1 transition-colors">
            <Plus size={12} /> Tambah item
          </button>
        </div>
      )}

      {block.type === 'divider' && (
        <div className="flex items-center gap-3 py-2">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
          <div className="w-1 h-1 rounded-full bg-gray-600" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
        </div>
      )}
    </div>
  );
};

// ── Content Editor ────────────────────────────────────────────────────────────
const ContentEditor = ({ value, onChange }) => {
  const blocks = Array.isArray(value) ? value : [];

  const addBlock    = (type) => onChange([...blocks, defaultBlock(type)]);
  const updateBlock = (i, b)  => { const n = [...blocks]; n[i] = b; onChange(n); };
  const deleteBlock = (i)     => onChange(blocks.filter((_, j) => j !== i));
  const moveBlock   = (i, dir) => {
    const n = [...blocks]; const j = i + dir;
    if (j < 0 || j >= n.length) return;
    [n[i], n[j]] = [n[j], n[i]]; onChange(n);
  };

  return (
    <div className="space-y-3">
      {blocks.length === 0 && (
        <div className="text-center py-8 text-gray-600 text-sm border border-dashed border-gray-700 rounded-2xl">
          Belum ada blok konten. Tambah di bawah.
        </div>
      )}
      {blocks.map((block, i) => (
        <BlockEditor key={i} block={block} index={i} total={blocks.length}
          onChange={updateBlock} onDelete={deleteBlock} onMove={moveBlock} />
      ))}
      <div className="pt-1">
        <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2 font-semibold">Tambah Blok</p>
        <div className="flex flex-wrap gap-2">
          {BLOCK_TYPES.map(({ type, icon: Icon, label }) => (
            <button key={type} type="button" onClick={() => addBlock(type)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/50 hover:bg-gray-700/60 border border-gray-700 hover:border-gray-600 rounded-lg text-xs text-gray-400 hover:text-white transition-all">
              <Icon size={12} className="text-purple-400" /> {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Reusable field input (harus di luar BlogForm agar tidak re-render) ────────
const FormField = ({ label, field, form, setForm, textarea, rows = 3, placeholder = '' }) => (
  <div>
    <label className="text-xs text-gray-400 block mb-1">{label}</label>
    {textarea ? (
      <textarea
        rows={rows}
        placeholder={placeholder}
        value={form[field] || ''}
        onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
        className="w-full bg-gray-800/50 border border-gray-700 focus:border-purple-500 rounded-xl px-4 py-3 text-white outline-none transition-colors text-sm resize-none"
      />
    ) : (
      <input
        type="text"
        placeholder={placeholder}
        value={form[field] || ''}
        onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
        className="w-full bg-gray-800/50 border border-gray-700 focus:border-purple-500 rounded-xl px-4 py-3 text-white outline-none transition-colors text-sm"
      />
    )}
  </div>
);

// ── Modal Form Blog ───────────────────────────────────────────────────────────
const BlogForm = ({ blog, token, onClose, onSaved }) => {
  const isEdit = !!blog?.id;

  const parseContent = (raw) => {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    if (typeof raw === 'string') {
      try { return JSON.parse(raw); } catch { return []; }
    }
    return [];
  };

  const [form, setForm] = useState({
    title:       blog?.title       || '',
    title_en:    blog?.title_en    || '',
    description: blog?.description || '',
    desc_en:     blog?.desc_en     || '',
    content:     parseContent(blog?.content),
    content_en:  parseContent(blog?.content_en),
    image:       blog?.image       || '',
    category:    blog?.category    || '',
    category_en: blog?.category_en || '',
    read_time:   blog?.read_time   || '3 min',
    show_home:   blog?.show_home   || false,
    slug:        blog?.slug        || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [tab, setTab]         = useState('id');

  // Auto-generate slug dari judul (hanya saat tambah baru)
  useEffect(() => {
    if (!isEdit && form.title) {
      const slug = form.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      setForm(f => ({ ...f, slug }));
    }
  }, [form.title]);

  const handleSave = async () => {
    if (!form.title) { setError('Judul wajib diisi'); return; }
    setLoading(true); setError('');
    try {
      const payload = {
        ...form,
        content:    JSON.stringify(form.content),
        content_en: JSON.stringify(form.content_en),
      };
      const url    = isEdit ? `${API}/admin/blogs/${blog.id}` : `${API}/admin/blogs`;
      const method = isEdit ? 'PUT' : 'POST';
      const res    = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Terjadi kesalahan'); return; }
      onSaved();
    } catch { setError('Gagal menyimpan'); }
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col">

        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <h3 className="text-base font-bold text-white">{isEdit ? 'Edit Blog' : 'Tambah Blog Baru'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={18} /></button>
        </div>

        <div className="flex border-b border-gray-800">
          {['id', 'en'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${tab === t ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-500 hover:text-gray-300'}`}>
              {t === 'id' ? '🇮🇩 Indonesia' : '🇺🇸 English'}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto flex-1 p-5 space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">{error}</div>
          )}

          {tab === 'id' ? (
            <>
              <FormField form={form} setForm={setForm} label="Judul (ID) *" field="title" placeholder="Judul artikel..." />
              <FormField form={form} setForm={setForm} label="Deskripsi Singkat (ID)" field="description" textarea rows={2} placeholder="Ringkasan singkat..." />
              <div>
                <label className="text-xs text-gray-400 block mb-2">Konten Artikel (ID)</label>
                <ContentEditor value={form.content} onChange={val => setForm(f => ({ ...f, content: val }))} />
              </div>
            </>
          ) : (
            <>
              <FormField form={form} setForm={setForm} label="Title (EN)" field="title_en" placeholder="Article title..." />
              <FormField form={form} setForm={setForm} label="Short Description (EN)" field="desc_en" textarea rows={2} placeholder="Brief summary..." />
              <div>
                <label className="text-xs text-gray-400 block mb-2">Article Content (EN)</label>
                <ContentEditor value={form.content_en} onChange={val => setForm(f => ({ ...f, content_en: val }))} />
              </div>
            </>
          )}

          <div className="border-t border-gray-800 pt-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField form={form} setForm={setForm} label="Kategori (ID)" field="category" placeholder="Teknologi" />
              <FormField form={form} setForm={setForm} label="Category (EN)" field="category_en" placeholder="Technology" />
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-2">Gambar Thumbnail / Hero</label>
              <ImageField
                value={form.image}
                onChange={url => setForm(f => ({ ...f, image: url }))}
                placeholder="https://..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField form={form} setForm={setForm} label="Estimasi Baca" field="read_time" placeholder="5 min" />
              <FormField form={form} setForm={setForm} label="Slug URL" field="slug" placeholder="judul-artikel" />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <div onClick={() => setForm(f => ({ ...f, show_home: !f.show_home }))}
                className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${form.show_home ? 'bg-purple-600' : 'bg-gray-700'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${form.show_home ? 'left-7' : 'left-1'}`} />
              </div>
              <span className="text-sm text-gray-300">Tampilkan di Homepage</span>
              {form.show_home && <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full">Aktif</span>}
            </label>
          </div>
        </div>

        <div className="p-5 border-t border-gray-800 flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 border border-gray-700 hover:border-gray-600 text-gray-400 hover:text-white rounded-xl text-sm font-semibold transition-all">
            Batal
          </button>
          <button onClick={handleSave} disabled={loading}
            className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2">
            <Save size={15} /> {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Users Panel ──────────────────────────────────────────────────────────────
const UsersPanel = ({ users, token, currentUserId, onRefresh, showToast }) => {
  const [addModal, setAddModal]         = useState(false);
  const [pwModal, setPwModal]           = useState(null); // { id, username }
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [addForm, setAddForm]           = useState({ username: '', email: '', password: '', role: 'user' });
  const [newPw, setNewPw]               = useState('');
  const [saving, setSaving]             = useState(false);

  const handleRoleChange = async (userId, role) => {
    const res = await fetch(`${API}/master/users/${userId}/role`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ role }),
    });
    const data = await res.json();
    if (!res.ok) { showToast(data.error || 'Gagal ubah role'); return; }
    onRefresh();
    showToast('Role berhasil diubah');
  };

  const handleAddUser = async () => {
    if (!addForm.username || !addForm.email || !addForm.password) {
      showToast('Semua field wajib diisi'); return;
    }
    setSaving(true);
    const res = await fetch(`${API}/master/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(addForm),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) { showToast(data.error || 'Gagal membuat akun'); return; }
    setAddModal(false);
    setAddForm({ username: '', email: '', password: '', role: 'user' });
    onRefresh();
    showToast('Akun berhasil dibuat');
  };

  const handleChangePassword = async () => {
    if (!newPw || newPw.length < 6) { showToast('Password minimal 6 karakter'); return; }
    setSaving(true);
    const res = await fetch(`${API}/master/users/${pwModal.id}/password`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ password: newPw }),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) { showToast(data.error || 'Gagal ubah password'); return; }
    setPwModal(null); setNewPw('');
    showToast('Password berhasil diubah');
  };

  const handleDelete = async (id) => {
    const res = await fetch(`${API}/master/users/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) { showToast(data.error || 'Gagal hapus akun'); setDeleteConfirm(null); return; }
    setDeleteConfirm(null);
    onRefresh();
    showToast('Akun berhasil dihapus');
  };

  const roleBadge = { user: 'bg-gray-700 text-gray-300', admin: 'bg-blue-500/20 text-blue-400', master_admin: 'bg-purple-500/20 text-purple-400' };
  const roleLabel = { user: 'User', admin: 'Admin', master_admin: 'Master Admin' };
  const inputCls  = "w-full bg-gray-800/50 border border-gray-700 focus:border-purple-500 rounded-xl px-4 py-3 text-white outline-none transition-colors text-sm";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Kelola Pengguna</h2>
          <p className="text-gray-500 text-xs mt-1">{users.length} akun terdaftar</p>
        </div>
        <button onClick={() => setAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl text-sm text-white font-semibold transition-all">
          <Plus size={16} /> Tambah Akun
        </button>
      </div>

      <div className="space-y-3">
        {users.map(u => {
          const isSelf   = u.id === currentUserId;
          const isMaster = u.role === 'master_admin';
          return (
            <div key={u.id} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                    {u.username?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-semibold text-sm">{u.username}</p>
                      {isSelf && <span className="text-[10px] text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full">Anda</span>}
                    </div>
                    <p className="text-gray-500 text-xs">{u.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Role badge / selector */}
                  {isMaster ? (
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${roleBadge.master_admin}`}>
                      {roleLabel.master_admin}
                    </span>
                  ) : (
                    <select value={u.role} onChange={e => handleRoleChange(u.id, e.target.value)}
                      className="bg-gray-800 border border-gray-700 text-xs text-white rounded-lg px-3 py-1.5 outline-none focus:border-purple-500 transition-colors">
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  )}

                  {/* Change password */}
                  {!isMaster && (
                    <button onClick={() => { setPwModal({ id: u.id, username: u.username }); setNewPw(''); }}
                      className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-xs text-gray-300 hover:text-white rounded-lg transition-all">
                      Ganti PW
                    </button>
                  )}

                  {/* Delete */}
                  {!isMaster && !isSelf && (
                    <button onClick={() => setDeleteConfirm(u)}
                      className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Modal Tambah Akun ── */}
      {addModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-gray-800">
              <h3 className="text-base font-bold text-white">Tambah Akun Baru</h3>
              <button onClick={() => setAddModal(false)} className="text-gray-500 hover:text-white"><X size={18} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Username</label>
                <input type="text" placeholder="username" value={addForm.username}
                  onChange={e => setAddForm(f => ({ ...f, username: e.target.value }))}
                  className={inputCls} />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Email</label>
                <input type="email" placeholder="email@example.com" value={addForm.email}
                  onChange={e => setAddForm(f => ({ ...f, email: e.target.value }))}
                  className={inputCls} />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Password</label>
                <input type="password" placeholder="Minimal 6 karakter" value={addForm.password}
                  onChange={e => setAddForm(f => ({ ...f, password: e.target.value }))}
                  className={inputCls} />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Role</label>
                <select value={addForm.role} onChange={e => setAddForm(f => ({ ...f, role: e.target.value }))}
                  className={inputCls}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="p-5 border-t border-gray-800 flex gap-3">
              <button onClick={() => setAddModal(false)}
                className="flex-1 py-2.5 border border-gray-700 text-gray-400 hover:text-white rounded-xl text-sm font-semibold transition-all">
                Batal
              </button>
              <button onClick={handleAddUser} disabled={saving}
                className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2">
                <Save size={15} /> {saving ? 'Menyimpan...' : 'Buat Akun'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Ganti Password ── */}
      {pwModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-sm">
            <div className="flex items-center justify-between p-5 border-b border-gray-800">
              <div>
                <h3 className="text-base font-bold text-white">Ganti Password</h3>
                <p className="text-xs text-gray-500 mt-0.5">Akun: {pwModal.username}</p>
              </div>
              <button onClick={() => setPwModal(null)} className="text-gray-500 hover:text-white"><X size={18} /></button>
            </div>
            <div className="p-5">
              <label className="text-xs text-gray-400 block mb-1">Password Baru</label>
              <input type="password" placeholder="Minimal 6 karakter" value={newPw}
                onChange={e => setNewPw(e.target.value)}
                className={inputCls} />
            </div>
            <div className="p-5 border-t border-gray-800 flex gap-3">
              <button onClick={() => setPwModal(null)}
                className="flex-1 py-2.5 border border-gray-700 text-gray-400 hover:text-white rounded-xl text-sm font-semibold transition-all">
                Batal
              </button>
              <button onClick={handleChangePassword} disabled={saving}
                className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2">
                <Save size={15} /> {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Konfirmasi Hapus ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={28} className="text-red-400" />
            </div>
            <h3 className="text-white font-bold text-lg mb-1">Hapus Akun?</h3>
            <p className="text-gray-400 text-sm mb-6">
              Akun <span className="text-white font-semibold">{deleteConfirm.username}</span> akan dihapus permanen.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 border border-gray-700 text-gray-400 hover:text-white rounded-xl text-sm font-semibold transition-all">
                Batal
              </button>
              <button onClick={() => handleDelete(deleteConfirm.id)}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-semibold transition-all">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Main Setting Page ─────────────────────────────────────────────────────────
const SettingPage = () => {
  const { user, token, isAdmin, isMaster, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const [activeMenu, setActiveMenu]       = useState('blog');
  const [blogs, setBlogs]                 = useState([]);
  const [users, setUsers]                 = useState([]);
  const [loading, setLoading]             = useState(false);
  const [modal, setModal]                 = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [homeIds, setHomeIds]             = useState([]);
  const [toast, setToast]                 = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API}/blogs`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setBlogs(list);
      setHomeIds(list.filter(b => b.show_home).map(b => b.id));
    } catch { showToast('Gagal memuat blog'); }
    finally { setLoading(false); }
  };

  const fetchUsers = async () => {
    const res  = await fetch(`${API}/master/users`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    setUsers(Array.isArray(data) ? data : []);
  };

  useEffect(() => { if (isAdmin()) fetchBlogs(); }, []);
  useEffect(() => { if (isMaster() && activeMenu === 'users') fetchUsers(); }, [activeMenu]);

  const handleDelete = async (id) => {
    await fetch(`${API}/admin/blogs/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    setDeleteConfirm(null);
    fetchBlogs();
    showToast('Blog berhasil dihapus');
  };

  const handleSetHome = async (id) => {
    const isOn = homeIds.includes(id);
    if (!isOn && homeIds.length >= 3) { showToast('Maksimal 3 blog di homepage'); return; }
    const newIds = isOn ? homeIds.filter(i => i !== id) : [...homeIds, id];
    try {
      await fetch(`${API}/admin/blogs/home`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ids: newIds }),
      });
      setHomeIds(newIds);
      showToast(isOn ? 'Blog disembunyikan dari homepage' : 'Blog ditampilkan di homepage');
    } catch { showToast('Gagal memperbarui homepage'); }
  };

  const roleBadge = { user: 'bg-gray-700 text-gray-300', admin: 'bg-blue-500/20 text-blue-400', master_admin: 'bg-purple-500/20 text-purple-400' };
  const roleLabel = { user: 'User', admin: 'Admin', master_admin: 'Master Admin' };
  const menus = [
    { id: 'blog',  label: 'Kelola Blog', icon: Edit2, show: isAdmin() },
    { id: 'users', label: 'Kelola User', icon: Users, show: isMaster() },
  ].filter(m => m.show);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="fixed inset-0 bg-gray-950 -z-10" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
      </div>

      {toast && (
        <div className="fixed top-6 right-6 z-[999] bg-gray-800 border border-gray-700 text-white px-5 py-3 rounded-xl shadow-xl text-sm animate-fadeIn">
          {toast}
        </div>
      )}

      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-40">
        <div className="mx-auto px-20 py-5 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
            <ArrowLeft size={18} /><span className="text-sm">Kembali</span>
          </Link>
          <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Pengaturan
          </div>
          <button onClick={logout} className="text-xs text-gray-500 hover:text-red-400 transition-colors">Keluar</button>
        </div>
      </nav>

      <div className="pt-20 pb-10 px-4 md:px-20 flex flex-col md:flex-row gap-6 max-w-8xl mx-auto">
        <aside className="w-full md:w-56 flex-shrink-0 flex flex-row md:flex-col gap-3 md:gap-0">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-4 mb-0 md:mb-4 w-2/5 md:w-auto flex flex-row md:flex-col items-center md:items-start gap-3 md:gap-0">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-base md:text-xl font-bold text-white md:mb-3 flex-shrink-0">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <p className="text-white font-semibold text-sm">{user?.username}</p>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${roleBadge[user?.role]}`}>
              {roleLabel[user?.role]}
            </span>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden w-3/5 md:w-auto">
            {menus.map((m, i) => (
              <button key={m.id} onClick={() => setActiveMenu(m.id)}
                className={`w-full flex items-center justify-between px-5 py-4 transition-all duration-300 ${i > 0 ? 'border-t border-gray-800/50' : ''} ${activeMenu === m.id ? 'bg-purple-600/20 text-purple-400' : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'}`}>
                <div className="flex items-center gap-3">
                  <m.icon size={16} />
                  <span className="text-sm font-medium">{m.label}</span>
                </div>
                <ChevronRight size={14} className={activeMenu === m.id ? 'text-purple-400' : 'text-gray-700'} />
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1">
          {activeMenu === 'blog' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Kelola Blog</h2>
                  <p className="text-gray-500 text-xs mt-1">{blogs.length} artikel · {homeIds.length}/3 di homepage</p>
                </div>
                <button onClick={() => setModal({ mode: 'add' })}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl text-sm text-white font-semibold transition-all">
                  <Plus size={16} /> Tambah Blog
                </button>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3 text-xs text-blue-400 flex items-center gap-2">
                <Home size={14} />
                Klik ikon rumah untuk mengatur blog yang tampil di homepage (maks. 3).
              </div>

              <div className="space-y-2">
                {loading ? (
                  <div className="text-center py-8 text-gray-600">Memuat...</div>
                ) : blogs.length === 0 ? (
                  <div className="text-center py-8 text-gray-600">Belum ada blog. Tambah yang pertama!</div>
                ) : (
                  blogs.map(blog => (
                    <div key={blog.id} className="bg-gray-900/50 border border-gray-800 hover:border-gray-700 rounded-2xl p-4 flex gap-4 transition-all">
                      {blog.image && (
                        <img src={blog.image} alt={blog.title} className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                          onError={e => e.target.style.display = 'none'} />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="text-white font-semibold text-sm line-clamp-1">{blog.title}</h3>
                            <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{blog.description}</p>
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              {blog.category && <span className="text-[10px] px-2 py-0.5 bg-gray-800 text-purple-400 rounded-full">{blog.category}</span>}
                              <span className="text-[10px] text-gray-600">{blog.read_time}</span>
                              {blog.slug && <span className="text-[10px] text-gray-600 font-mono">/{blog.slug}</span>}
                              {homeIds.includes(blog.id) && (
                                <span className="text-[10px] px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-full font-bold">HOMEPAGE</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button onClick={() => handleSetHome(blog.id)}
                              title={homeIds.includes(blog.id) ? 'Sembunyikan dari homepage' : 'Tampilkan di homepage'}
                              className={`p-2 rounded-lg transition-colors ${homeIds.includes(blog.id) ? 'text-purple-400 bg-purple-500/20' : 'text-gray-600 hover:text-gray-300 hover:bg-gray-800'}`}>
                              <Home size={16} />
                            </button>
                            <button onClick={() => setModal({ mode: 'edit', blog })}
                              className="p-2 rounded-lg text-gray-600 hover:text-blue-400 hover:bg-blue-500/10 transition-colors">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => setDeleteConfirm(blog.id)}
                              className="p-2 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeMenu === 'users' && isMaster() && (
            <UsersPanel
              users={users}
              token={token}
              currentUserId={user?.id}
              onRefresh={fetchUsers}
              showToast={showToast}
            />
          )}
        </main>
      </div>

      {modal && (
        <BlogForm blog={modal.blog} token={token}
          onClose={() => setModal(null)}
          onSaved={() => { setModal(null); fetchBlogs(); showToast('Blog berhasil disimpan!'); }} />
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={28} className="text-red-400" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Hapus Blog?</h3>
            <p className="text-gray-400 text-sm mb-6">Tindakan ini tidak bisa dibatalkan.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 border border-gray-700 text-gray-400 hover:text-white rounded-xl text-sm font-semibold transition-all">Batal</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-semibold transition-all">Hapus</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default SettingPage;