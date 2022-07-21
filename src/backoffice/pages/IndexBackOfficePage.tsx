import { Outlet } from "react-router-dom"
import { useUiStore } from "../../hooks/useUiStore"
import { LeftBar } from "../components/LeftBar"
import { menuItems } from "../components/Menu/items"
import { Menu } from "../components/Menu/Menu"
import { NavbarBackoffice } from "../components/NavbarBackoffice"

function IndexBackOfficePage() {

  const { activeMobile, desactiveMobile } = useUiStore()

  const onMenuItemClick = (event: any) => {
    console.log(event)
    return
    if (!event.item.items) {
      // setOverlayMenuActive(false);
      desactiveMobile();
    }
    event.preventDefault()
  }

  return (
    <>
      <div className="bg-[#EDF1F5]">

        {/* NAVBAR */}
        <NavbarBackoffice />
        {/* LEFT BAR */}
        <LeftBar>
          <Menu model={menuItems} onMenuItemClick={onMenuItemClick} />
        </LeftBar>
        {/* MAIN */}
        <main className="flex min-h-screen flex-col justify-between p-4 ml-[350px] pt-32">
          <div className="flex-auto">
            <Outlet />
          </div>
        </main>




      </div>

    </>
  )
}

export default IndexBackOfficePage
