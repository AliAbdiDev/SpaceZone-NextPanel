/** @jsxImportSource @emotion/react */
import { useState, useRef, KeyboardEvent, ChangeEvent, useCallback, memo, useId } from 'react';
import { css, keyframes } from '@emotion/react';
import { X } from 'lucide-react';
import { Input } from '@/core/components/shadcn/ui/input';
import { LabelCustom } from '../LabelCustom';
import { TypographyInputErrorMassage } from '../Typography';
import { useFormContext } from 'react-hook-form';

interface Tag {
  value: string;
}

interface TagFieldProps {
  initialTags?: Tag[];
  placeholder?: string;
  onChange?: (tags: Tag[]) => void;
  maxItem?: number;
  maxLength?: number;
  label?: string;
  name: string;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const tagsToString = (tags: Tag[]): string => {
  return tags.map((tag) => tag.value).join(' ');
};

const TagItem = memo(({ tag, index, onRemove }: { tag: Tag; index: number; onRemove: (index: number) => void }) => (
  <span
    css={css`
      animation: ${fadeIn} 0.3s ease;
    `}
    className="flex items-center gap-1.5 bg-blue-100 text-primary rounded px-2 py-0.5 mr-2 mb-2"
  >
    {tag.value}
    <button
      type="button"
      onClick={() => onRemove(index)}
      className="flex items-center cursor-pointer"
      aria-label={`حذف تگ ${tag.value}`}
    >
      <X size={12} />
    </button>
  </span>
));

TagItem.displayName = 'TagItem';

export function TagField({
  initialTags = [],
  placeholder = 'اضافه کردن تگ...',
  maxItem = 5,
  maxLength = 15,
  name,
  label,
  onChange,
}: TagFieldProps) {
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const errorMessage = (errors?.[name]?.message as string) || '';

  const addTag = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (trimmed && trimmed.length <= maxLength && !tags.some((tag) => tag.value === trimmed)) {
        const newTags = [...tags, { value: trimmed }];
        setTags(newTags);
        setValue(name, tagsToString(newTags));
        if (onChange) onChange(newTags);
        clearErrors(name);
      } else if (trimmed.length > maxLength) {
        setError(name, { message: `حداکثر ${maxLength} کاراکتر مجاز است` });
      } else if (tags.some((tag) => tag.value === trimmed)) {
        setError(name, { message: `از قبل وارد شده است` });
      }
    },
    [tags, maxLength, onChange, setValue, setError, clearErrors, name]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (tags.length >= maxItem) {
        setError(name, { message: `حداکثر ${maxItem} تگ مجاز است` });
        e.preventDefault();
        return;
      }
      clearErrors(name);

      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        if (inputValue.trim()) {
          addTag(inputValue);
          setInputValue('');
        }
      } else if (e.key === 'Backspace' && inputValue === '' && tags.length) {
        e.preventDefault();
        const newTags = tags.slice(0, -1);
        setTags(newTags);
        setValue(name, tagsToString(newTags));
        if (onChange) onChange(newTags);
      }
    },
    [addTag, inputValue, maxItem, tags, onChange, setValue, setError, clearErrors, name]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value.length > maxLength) {
        setError(name, { message: `حداکثر کاراکتر ${maxLength} است` });
        setInputValue(value.slice(0, maxLength));
      } else {
        clearErrors(name);
        setInputValue(value);
      }
    },
    [maxLength, setError, clearErrors, name]
  );

  const handleRemove = useCallback(
    (index: number) => {
      const newTags = tags.filter((_, i) => i !== index);
      setTags(newTags);
      setValue(name, tagsToString(newTags));
      if (onChange) onChange(newTags);
      inputRef.current?.focus();
    },
    [tags, onChange, setValue, name]
  );

  const handleClearAll = useCallback(() => {
    setTags([]);
    setValue(name, tagsToString([]));
    if (onChange) onChange([]);
    inputRef.current?.focus();
  }, [onChange, setValue, name]);

  const id = useId();

  return (
    <div className="w-full">
      <LabelCustom htmlFor={id} errorMessage={errorMessage}>
        {label}
      </LabelCustom>
      <div className="relative">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pr-9"
        />
        {tags.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
            aria-label="حذف همه تگ‌ها"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {tags.length > 0 && (
        <div className="mt-1.5 w-full border border-input/50 rounded-md p-2 flex flex-wrap">
          {tags.map((tag, i) => (
            <TagItem key={i} tag={tag} index={i} onRemove={handleRemove} />
          ))}
        </div>
      )}
      <TypographyInputErrorMassage>{errorMessage}</TypographyInputErrorMassage>
    </div>
  );
}
