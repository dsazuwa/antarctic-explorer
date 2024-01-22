function FilterIcon({ className }: { className: string }) {
  return (
    <svg
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      viewBox='0 0 24 24'
      height='1em'
      width='1em'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path fill='none' d='M0 0h24v24H0V0z'></path>
      <path d='M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z'></path>
    </svg>

    // <svg
    //   xmlns='http://www.w3.org/2000/svg'
    //   stroke-width='1.5'
    //   stroke='currentColor'
    //   fill='none'
    //   viewBox='0 0 24 24'
    //   className={clsx('h-4 w-4', className)}
    // >
    //   <path
    //     stroke-linecap='round'
    //     stroke-linejoin='round'
    //     d='M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5'
    //   />
    // </svg>
  );
}

export default FilterIcon;
