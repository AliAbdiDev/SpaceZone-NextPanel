import { FieldsListArray } from '@/core/assets/types/field';
import { TextField } from './TextField';

interface Props {
  fieldListArray: FieldsListArray;
}

export function TextFieldsList({ fieldListArray }: Props) {
  return fieldListArray?.map((item, index) => <TextField key={index} fieldName={item?.name} {...item} />);
}
