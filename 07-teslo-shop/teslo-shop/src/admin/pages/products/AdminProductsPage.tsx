import { AdminTitle } from '@/admin/components/AdminTitle';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Link } from 'react-router';
import { CustomPagination } from '../../../components/custom/CustomPagination';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AdminProductsPage = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle
          title="Products"
          subtitle="Here you can show and administrate your products"
        />
        <div className="flex justify-end mb-10 gap-4">
          <Link to={'/admin/products/new'}>
            <Button>
              <PlusIcon />
              New Product
            </Button>
          </Link>
        </div>
      </div>

      <Table className="bg-whitete p-10 shadow-xs border border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Sizes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>
              <img
                src="https://placehold.co/250x250"
                alt="product"
                className="w-20 h-20 object-cover rounded-md"
              />
            </TableCell>
            <TableCell>Product 11</TableCell>
            <TableCell>$250.00</TableCell>
            <TableCell>T-Shirt</TableCell>
            <TableCell>125</TableCell>
            <TableCell>xl, l, m, xs, s</TableCell>
            <TableCell className="text-right">
              <Link to={`/admin/products/t-shirt-1`}>Editar</Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <CustomPagination totalPages={10} />
    </>
  );
};
