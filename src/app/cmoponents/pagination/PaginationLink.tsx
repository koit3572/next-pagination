'use client'
import { PRODUCTS_PER_PAGE } from '@/constants';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import qs from 'query-string'
import Link from 'next/link';
interface PaginationLinkProps {
  active?: boolean;
  disabled ?: boolean;
  page: number;
  children: React.ReactNode;
}
const PaginationLink: React.FC<PaginationLinkProps> = ({ page, children, ...props }) => {
  const params = useSearchParams();
  const limit = PRODUCTS_PER_PAGE;
  const skip = page ? (Number(page) - 1) * limit : 0;
  let curentQuery = {}
  if(params) {
    curentQuery = qs.parse(params.toString())
  }
  const updatedQuery = {
    ...curentQuery,
    page: page,
    skip: skip,
  };
  return (
    <Link
      href={{ query: updatedQuery }}
      className={`p-2 text-2xl font-medium 
        ${props.active ? "font-bold text-orange-500" : "text-gray-500"}
        ${props.disabled ? "pointer-events-none text-gray-200" : ""}
      `}
    >
      {children}
    </Link>
  );
}

export default PaginationLink