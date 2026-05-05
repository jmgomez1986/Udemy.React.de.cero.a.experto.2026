import { Link, useLocation } from 'react-router';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '../ui/breadcrumb';
import { SlashIcon } from 'lucide-react';

interface Breadcrumb {
  key: number;
  label: string;
  to: string;
}

interface Props {
  currentPage: string;
  breadcrumbs?: Breadcrumb[];
}

export const CustomBreadcrumbs = ({ currentPage, breadcrumbs = [] }: Props) => {
  const { pathname } = useLocation();

  return (
    <Breadcrumb className="my-6">
      <BreadcrumbList>
        {pathname === '/' ? (
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}

        {breadcrumbs.map((breadcrumb) => (
          <div className="flex items-center" key={breadcrumb.key}>
            <BreadcrumbSeparator className="mr-1.5">
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={breadcrumb.to}>{breadcrumb.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}

        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>

        <BreadcrumbItem>
          <BreadcrumbPage className="text-black">{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>

        {/* {pathname === path && (
          <>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbPage>{currentPage}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )} */}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
