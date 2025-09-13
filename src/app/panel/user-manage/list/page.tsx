import DataTable from '@/core/components/custom/template/DataTable';
import { userColumns } from '../common/UserColumns';
import { generateMockUsers } from '@/core/assets/mock/userMock';

function Page() {
  return <DataTable columns={userColumns} data={generateMockUsers(50)} />;
}

export default Page;
