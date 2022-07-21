import { LeftBar } from "../components/LeftBar"
import { ListTypeVehicle } from "../components/ListTypeVehicle"
import { menuItems } from "../components/Menu/items"
import { Menu } from "../components/Menu/Menu"
import { NavbarBackoffice } from "../components/NavbarBackoffice"

function IndexBackOfficePage() {
  


  
  return (
    <>
      <div className="bg-[#EDF1F5]">

        <NavbarBackoffice />
        {/* <StatisticsCards /> */}
        <LeftBar>
          <Menu model={menuItems}/>
        </LeftBar>
        <main className="flex min-h-screen flex-col justify-between p-4 ml-[350px] pt-32">
          <div className="flex-auto">
            <ListTypeVehicle />
          </div>

        </main>

      </div>

    </>
  )
}

export default IndexBackOfficePage
