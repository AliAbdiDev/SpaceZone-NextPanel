import { DropdownMenuCustom, DropdownMenuItemData } from '@/core/components/custom/blocks/DropdownMenuCustom';

type DropdownMenuCustomProps = typeof DropdownMenuCustom;

interface Props extends Omit<React.ComponentProps<DropdownMenuCustomProps>, 'footer'> {
  deleteMenuItem?: DropdownMenuItemData[number];
  editMenuItem?: Omit<DropdownMenuItemData[number], 'menuItem'>;
}

function DropdownMenuCustomDashboard({ deleteMenuItem, editMenuItem, ...props }: Props) {
  return (
    <DropdownMenuCustom
      {...props}
      footer={[
        { menuItem: 'ویرایش', activeSeparator: true, ...editMenuItem },
        { menuItem: 'حذف', propertys: { variant: 'destructive' }, ...deleteMenuItem },
      ]}
    />
  );
}

export default DropdownMenuCustomDashboard;
