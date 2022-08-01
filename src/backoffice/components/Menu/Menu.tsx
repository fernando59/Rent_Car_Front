
import classNames from 'classnames';
import { Badge } from 'primereact/badge';
import { Ripple } from "primereact/ripple";
import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';


interface PropsSubMenu {
    items: []
    root?: boolean
    onMenuItemClick?: (props: any) => void
    className?: any
}

const SubMenu: FC<PropsSubMenu> = ({ items, root, onMenuItemClick, className }) => {

    const [activeIndex, setActiveIndex] = useState(null)
    const renderLinkContent = (item: any) => {
        let submenuIcon = item.items && <i className="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>;
        let badge = item.badge && <Badge value={item.badge} />

        return (
            <>
                <i className={item.icon}></i>
                <span className='pl-2 py-8'>{item.label}</span>
                {submenuIcon}
                {badge}
                <Ripple />
            </>
        );
    }
    const onMenuItemClick1 = (event: any, item: any, index: any) => {
        //avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        //execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }

        if (index === activeIndex)
            setActiveIndex(null);
        else
            setActiveIndex(index);

        if (onMenuItemClick) {
            onMenuItemClick({
                originalEvent: event,
                item: item
            });
        }
    }
    const onKeyDown = (event: any) => {
        if (event.code === 'Enter' || event.code === 'Space') {
            event.preventDefault();
            event.target.click();
        }
    }
    const renderLink = (item: any, i: any) => {
        let content = renderLinkContent(item);

        if (item.to) {
            return (
                <NavLink aria-label={item.label} onKeyDown={onKeyDown} role="menuitem" className={({ isActive }) => isActive ? '' : 'p-ripple'}
                    to={item.to} onClick={(e) => onMenuItemClick1(e, item, i)}  target={item.target}>
                    {content}
                </NavLink>
                // <NavLink aria-label={item.label} onKeyDown={onKeyDown} role="menuitem" className="p-ripple"
                //  activeClassName="router-link-active router-link-exact-active" to={item.to} onClick={(e) => onMenuItemClick(e, item, i)} exact target={item.target}>
                //     {content}
                // </NavLink>
            )
        }
        else {
            return (
                <a aria-label={item.label} onKeyDown={onKeyDown} role="menuitem" href={item.url} className="p-ripple" onClick={(e) => onMenuItemClick1(e, item, i)} target={item.target}>
                    {content}
                </a>
            );
        }
    }
    let itemsIterate = items && items.map((item: any, i: any) => {
        let active = activeIndex === i;
        let styleClass = classNames(item.badgeStyleClass, { 'layout-menuitem-category': root, 'active-menuitem': active && !item.to });

        if (root) {
            return (
                <li className={styleClass} key={i} role="none">
                    {root === true && <>
                        <div className="uppercase text-gray-700 mb-2  text-sm font-semibold" aria-label={item.label}>{item.label}</div>
                        <SubMenu items={item.items} onMenuItemClick={onMenuItemClick} />
                    </>}
                </li>
            );
        }
        else {
            return (
                <li className={styleClass} key={i} role="none">
                    {renderLink(item, i)}
                    <CSSTransition classNames="layout-submenu-wrapper" timeout={{ enter: 1000, exit: 450 }} in={active} unmountOnExit>
                        <SubMenu items={item.items} onMenuItemClick={onMenuItemClick} />
                    </CSSTransition>
                </li>
            );
        }
    });

    return itemsIterate ? <ul className={className} role="menu">{itemsIterate}</ul> : null;
}
export const Menu = (model: any,onMenuItemClick:any) => {

    return (
        <>

            {/* <SubMenu items={model.model}  root={true} onMenuItemClick={onMenuItemClick}/> */}
            <SubMenu items={model.model}  root={true} />
        </>
    )
}
