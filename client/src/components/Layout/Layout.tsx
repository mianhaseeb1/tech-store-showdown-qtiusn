import { Avatar } from '@/components/elements/Avatar'
import { Dropdown, DropdownButton, DropdownDivider, DropdownItem, DropdownLabel, DropdownMenu } from '@/components/elements/Dropdown'
import { Navbar, NavbarDivider, NavbarItem, NavbarLabel, NavbarSection, NavbarSpacer } from '@/components/elements/Navbar'
import { Sidebar, SidebarBody, SidebarHeader, SidebarItem, SidebarLabel, SidebarSection } from '@/components/elements/Sidebar'
import { StackedLayout } from '@/components/elements/StackedLayout'
import useAuth from '@/contexts/AuthContext'
import { ArrowRightStartOnRectangleIcon, Cog8ToothIcon, ShieldCheckIcon, ShoppingBagIcon } from '@heroicons/react/16/solid'
import { ShoppingCartIcon } from '@heroicons/react/20/solid'

const navItems = [
    { label: 'Home', url: '/' },
    { label: 'Add Product', url: '/product/new' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
    const { logout } = useAuth()

    const handleLogout = () => {
        logout()
    }

    return (
        <StackedLayout
            navbar={
                <Navbar>
                    <Dropdown>
                        <DropdownButton as={NavbarItem} className="max-lg:hidden">
                            <Avatar src="/store_icon.png" square />
                            <NavbarLabel>IT Store</NavbarLabel>
                        </DropdownButton>
                    </Dropdown>
                    <NavbarDivider className="max-lg:hidden" />
                    <NavbarSection className="max-lg:hidden">
                        {navItems.map(({ label, url }) => (
                            <NavbarItem key={label} href={url}>
                                {label}
                            </NavbarItem>
                        ))}
                    </NavbarSection>
                    <NavbarSpacer />
                    <NavbarSection>
                        <NavbarItem href="/cart" aria-label="Inbox">
                            <ShoppingCartIcon />
                        </NavbarItem>
                        <Dropdown>
                            <DropdownButton as={NavbarItem}>
                                <Avatar src="/profile-photo.svg" square />
                            </DropdownButton>
                            <DropdownMenu className="min-w-64" anchor="bottom end">
                                <DropdownItem href="/settings">
                                    <Cog8ToothIcon />
                                    <DropdownLabel>Settings</DropdownLabel>
                                </DropdownItem>
                                <DropdownItem href="/orders">
                                    <ShoppingBagIcon />
                                    <DropdownLabel>Orders</DropdownLabel>
                                </DropdownItem>
                                <DropdownDivider />
                                <DropdownItem href="/privacy-policy">
                                    <ShieldCheckIcon />
                                    <DropdownLabel>Privacy policy</DropdownLabel>
                                </DropdownItem>
                                <DropdownDivider />
                                <DropdownItem onClick={handleLogout}>
                                    <ArrowRightStartOnRectangleIcon />
                                    <DropdownLabel>Sign out</DropdownLabel>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarSection>
                </Navbar>
            }
            sidebar={
                <Sidebar>
                    <SidebarHeader>
                        <Dropdown>
                            <DropdownButton as={SidebarItem} className="lg:mb-2.5">
                                <Avatar src="/profile-photo.svg" square />
                                <SidebarLabel>IT Store</SidebarLabel>
                            </DropdownButton>
                        </Dropdown>
                    </SidebarHeader>
                    <SidebarBody>
                        <SidebarSection>
                            {navItems.map(({ label, url }) => (
                                <SidebarItem key={label} href={url}>
                                    {label}
                                </SidebarItem>
                            ))}
                        </SidebarSection>
                    </SidebarBody>
                </Sidebar>
            }
        >
            {children}
        </StackedLayout>
    )
}
