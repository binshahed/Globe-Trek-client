import { PROTECTED_ROUTE } from "@/src/constant/protectedRoutes";
import { removeCookies } from "@/src/service/authService";
import { logout, useCurrentUser } from "@/src/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";

import {
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu
} from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const AvatarDropDown = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);
  const pathName = usePathname();
  const router = useRouter();
  const handleLogout = () => {
    removeCookies();
    dispatch(logout());
    if (PROTECTED_ROUTE.some((route) => pathName.match(route))) {
      router.push("/");
    }
  };

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: `${user?.data?.photoUrl}`
          }}
          className="transition-transform"
          description={user?.data?.email}
          name={user?.data?.name}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <Link href="/profile" className="block">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{user?.data?.email}</p>
          </Link>
        </DropdownItem>

        <DropdownItem key="crate_post">
          <Link href="/profile/" className="block">
            Profile
          </Link>
        </DropdownItem>
        <DropdownItem key="crate_post">
          <Link href={`/${user?.data?.role}`} className="block">
            Dashboard
          </Link>
        </DropdownItem>

        <DropdownItem key="logout" color="danger" onClick={handleLogout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AvatarDropDown;
