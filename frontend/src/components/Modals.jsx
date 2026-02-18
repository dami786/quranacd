import { useEffect, useState } from 'react';
import { HiX } from 'react-icons/hi';
import { Button } from './Buttons';
import { Input, Textarea } from './Forms';
import { getImageUrl } from '../services/api';

export function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            type="button"
            className="p-2 rounded-lg hover:bg-bg-alt text-gray-600 transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <HiX className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export function ItemFormModal({ open, onClose, onSubmit, initialValues, loading }) {
  const isEdit = !!initialValues?._id;
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!open) setPreview(null);
    else if (initialValues?.image) setPreview(getImageUrl(initialValues.image));
    else setPreview(null);
  }, [open, initialValues?.image]);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(initialValues?.image ? getImageUrl(initialValues.image) : null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const file = form.imageFile?.files?.[0];
    const imageUrl = form.imageUrl?.value?.trim();
    if (file) {
      const formData = new FormData();
      formData.append('title', form.title.value);
      formData.append('description', form.description.value);
      formData.append('price', form.price.value);
      formData.append('image', file);
      onSubmit(formData);
    } else {
      onSubmit({
        title: form.title.value,
        description: form.description.value,
        image: imageUrl || (isEdit ? initialValues?.image || '' : ''),
        price: Number(form.price.value),
      });
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? 'Edit Course' : 'Add Course'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          name="title"
          required
          defaultValue={initialValues?.title}
          placeholder="e.g. Noorani Qaida Online"
        />
        <Textarea
          label="Description"
          name="description"
          rows={3}
          defaultValue={initialValues?.description}
          placeholder="Course description..."
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Image (computer ya mobile se upload karein)
          </label>
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary-dark"
            onChange={onFileChange}
          />
          <p className="mt-1 text-xs text-gray-500">JPEG, PNG, GIF, WebP. Max 5MB.</p>
          {preview && (
            <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 inline-block">
              <img src={preview} alt="Preview" className="h-24 w-auto object-cover" />
            </div>
          )}
        </div>
        <Input
          label="Ya image URL daalein (optional)"
          name="imageUrl"
          type="url"
          defaultValue={initialValues?.image?.startsWith('http') ? initialValues.image : ''}
          placeholder="https://..."
        />
        <Input
          label="Price (USD per month)"
          name="price"
          type="number"
          step="0.01"
          min="0"
          required
          defaultValue={initialValues?.price}
          placeholder="30"
        />
        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outlinePrimary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Saving...' : isEdit ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
