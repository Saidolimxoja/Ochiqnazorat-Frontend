import type { IconProps } from './types'

export function IconMenu({ className, title }: IconProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  )
}

export function IconSearch({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
    </svg>
  )
}

export function IconChevron({ className, down }: IconProps & { down?: boolean }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{ transform: down ? 'rotate(180deg)' : undefined }}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconHome({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        opacity="0.5"
        d="M10.9218 18.3333H9.07835C6.20622 18.3333 4.77016 18.3333 3.79094 17.4901C2.81172 16.6469 2.60863 15.2355 2.20245 12.4126L1.97014 10.7982C1.65394 8.60064 1.49584 7.50187 1.94622 6.56241C2.3966 5.62296 3.35524 5.05191 5.27251 3.9098L6.42654 3.22235C8.16762 2.1852 9.03816 1.66663 10.0001 1.66663C10.962 1.66663 11.8325 2.1852 13.5736 3.22235L14.7277 3.9098C16.6449 5.05191 17.6036 5.62296 18.0539 6.56241C18.5043 7.50187 18.3462 8.60064 18.03 10.7982L17.7977 12.4126C17.3915 15.2355 17.1884 16.6469 16.2092 17.4901C15.23 18.3333 13.7939 18.3333 10.9218 18.3333Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 15.625C9.65482 15.625 9.375 15.3452 9.375 15V12.5C9.375 12.1548 9.65482 11.875 10 11.875C10.3452 11.875 10.625 12.1548 10.625 12.5V15C10.625 15.3452 10.3452 15.625 10 15.625Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function IconBrandOchiqMark({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill="#fff"
        d="M7 9.5h1.25L23.25 13.6q.75.2.75.95v10.4q0 .65-.55.85l-14.2 3.5H7q-.55 0-.55-.55V10.05q0-.55.55-.55Z"
      />
      <path
        d="M8.4 10.6 22.2 22.8"
        stroke="#36D4E8"
        strokeWidth="1.35"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="13.2" cy="15.4" r="1.65" fill="#0f172a" />
      <rect x="11.9" y="18" width="2.6" height="7.6" rx="1.3" fill="#0f172a" />
    </svg>
  )
}

export function IconMountainMark({ className }: IconProps) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M4 26L11 12l5 9 5-11 8 16H4z" fill="currentColor" opacity="0.95" />
      <path d="M14 26l3-6 3 6h-6z" fill="currentColor" opacity="0.35" />
    </svg>
  )
}

export function IconMessage({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M14.3614 6.21995L13.0809 7.28704C12.2257 7.99971 11.6319 8.49291 11.1307 8.81532C10.6454 9.12741 10.3163 9.23217 10 9.23217C9.6837 9.23217 9.35463 9.12741 8.86939 8.81532C8.3681 8.49291 7.77435 7.99971 6.91913 7.28704L4.94014 5.63788C4.64845 5.39481 4.21494 5.43422 3.97187 5.72591C3.72879 6.0176 3.7682 6.45111 4.05989 6.69418L6.07334 8.37206C6.88584 9.04916 7.54437 9.59796 8.1256 9.97178C8.73105 10.3612 9.3207 10.6072 10 10.6072C10.6793 10.6072 11.269 10.3612 11.8744 9.97178C12.4557 9.59796 13.1142 9.04916 13.9267 8.37205L15.3152 7.21496C14.9394 6.94512 14.6155 6.60748 14.3614 6.21995Z"
        fill="currentColor"
      />
      <path
        d="M15.378 5.48933C15.6134 5.44711 15.8641 5.52906 16.0282 5.72591C16.1636 5.88845 16.2114 6.09503 16.1766 6.28816C15.8535 6.0862 15.5799 5.81249 15.378 5.48933Z"
        fill="currentColor"
      />
      <path
        opacity="0.5"
        d="M14.1315 2.51749C13.4635 2.5 12.7032 2.5 11.8335 2.5H8.16683C4.70986 2.5 2.98138 2.5 1.90744 3.59835C0.833496 4.6967 0.833496 6.46447 0.833496 10C0.833496 13.5355 0.833496 15.3033 1.90744 16.4017C2.98138 17.5 4.70986 17.5 8.16683 17.5H11.8335C15.2905 17.5 17.0189 17.5 18.0929 16.4017C19.1668 15.3033 19.1668 13.5355 19.1668 10C19.1668 9.11052 19.1668 8.33294 19.1497 7.64975C18.6519 7.89953 18.0921 8.03977 17.5002 8.03977C15.4291 8.03977 13.7502 6.32268 13.7502 4.20455C13.7502 3.5992 13.8873 3.0266 14.1315 2.51749Z"
        fill="currentColor"
      />
      <path
        d="M20 4.16663C20 5.54734 18.8807 6.66663 17.5 6.66663C16.1193 6.66663 15 5.54734 15 4.16663C15 2.78591 16.1193 1.66663 17.5 1.66663C18.8807 1.66663 20 2.78591 20 4.16663Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function IconInbox({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        opacity="0.5"
        d="M1.6665 9.99996C1.6665 6.07159 1.6665 4.1074 2.88689 2.88701C4.10728 1.66663 6.07147 1.66663 9.99984 1.66663C13.9282 1.66663 15.8924 1.66663 17.1128 2.88701C18.3332 4.1074 18.3332 6.07159 18.3332 9.99996C18.3332 13.9283 18.3332 15.8925 17.1128 17.1129C15.8924 18.3333 13.9282 18.3333 9.99984 18.3333C6.07147 18.3333 4.10728 18.3333 2.88689 17.1129C1.6665 15.8925 1.6665 13.9283 1.6665 9.99996Z"
        fill="currentColor"
      />
      <path
        d="M2.88693 17.113C4.10735 18.3334 6.07159 18.3334 10.0001 18.3334C13.9286 18.3334 15.8928 18.3334 17.1132 17.113C18.2441 15.9821 18.3271 14.2126 18.3332 10.8334H15.7C14.9457 10.8334 14.5685 10.8334 14.237 10.9859C13.9055 11.1383 13.66 11.4247 13.1691 11.9974L12.6646 12.586C12.1736 13.1587 11.9282 13.4451 11.5967 13.5976C11.2651 13.75 10.888 13.75 10.1336 13.75H9.86652C9.11219 13.75 8.73503 13.75 8.4035 13.5976C8.07196 13.4451 7.82651 13.1587 7.3356 12.586L6.83106 11.9974C6.34015 11.4247 6.09469 11.1383 5.76316 10.9859C5.43163 10.8334 5.05446 10.8334 4.30013 10.8334H1.6665C1.67259 14.2126 1.75604 15.9821 2.88693 17.113Z"
        fill="currentColor"
      />
      <path
        d="M10.4419 9.44174C10.3247 9.55895 10.1658 9.6248 10 9.6248C9.83424 9.6248 9.67527 9.55895 9.55806 9.44174L6.80806 6.69174C6.56398 6.44766 6.56398 6.05193 6.80806 5.80786C7.05214 5.56378 7.44786 5.56378 7.69194 5.80785L9.375 7.49091L9.375 1.66682C9.57758 1.66663 9.78579 1.66663 9.99984 1.66663C10.214 1.66663 10.4223 1.66663 10.625 1.66682V7.49091L12.3081 5.80785C12.5521 5.56378 12.9479 5.56378 13.1919 5.80785C13.436 6.05193 13.436 6.44766 13.1919 6.69174L10.4419 9.44174Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function IconSidebarDown({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6.1852 7.91757L9.40005 4.60233C9.60065 4.39547 9.47906 4 9.21485 4H2.78515C2.52094 4 2.39935 4.39547 2.59995 4.60233L5.8148 7.91757C5.92137 8.02748 6.07863 8.02748 6.1852 7.91757Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function IconPlus({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  )
}
