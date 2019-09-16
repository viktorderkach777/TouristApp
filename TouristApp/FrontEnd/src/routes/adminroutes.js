import React from 'react';




const Breadcrumbs = React.lazy(() => import('../views/Base/Breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('../views/Base/Cards/Cards'));
const Carousels = React.lazy(() => import('../views/Base/Carousels/Carousels'));
const Collapses = React.lazy(() => import('../views/Base/Collapses/Collapses'));
const Dropdowns = React.lazy(() => import('../views/Base/Dropdowns/Dropdowns'));
const Forms = React.lazy(() => import('../views/Base/Forms/Forms'));
const Jumbotrons = React.lazy(() => import('../views/Base/Jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('../views/Base/ListGroups/ListGroups'));
const Navbars = React.lazy(() => import('../views/Base/Navbars/Navbars'));
const Navs = React.lazy(() => import('../views/Base/Navs/Navs'));
const Paginations = React.lazy(() => import('../views/Base/Paginations/Pagnations'));
const Popovers = React.lazy(() => import('../views/Base/Popovers/Popovers'));
const ProgressBar = React.lazy(() => import('../views/Base/ProgressBar/ProgressBar'));
const Switches = React.lazy(() => import('../views/Base/Switches/Switches'));
const Tables = React.lazy(() => import('../views/Base/Tables/Tables'));
const Tabs = React.lazy(() => import('../views/Base/Tabs/Tabs'));
const Tooltips = React.lazy(() => import('../views/Base/Tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('../views/Buttons/BrandButtons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('../views/Buttons/ButtonDropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('../views/Buttons/ButtonGroups/ButtonGroups'));
const Buttons = React.lazy(() => import('../views/Buttons/Buttons/Buttons'));
const Charts = React.lazy(() => import('../views/Charts/Charts'));
const Dashboard = React.lazy(() => import('../views/Dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('../views/Icons/CoreUIIcons/CoreUIIcons'));
const Flags = React.lazy(() => import('../views/Icons/Flags/Flags'));
const FontAwesome = React.lazy(() => import('../views/Icons/FontAwesome/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('../views/Icons/SimpleLineIcons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('../views/Notifications/Alerts/Alerts'));
const Badges = React.lazy(() => import('../views/Notifications/Badges/Badges'));
const Modals = React.lazy(() => import('../views/Notifications/Modals/Modals'));
const Colors = React.lazy(() => import('../views/Theme/Colors/Colors'));
const Typography = React.lazy(() => import('../views/Theme/Typography/Typography'));
const Widgets = React.lazy(() => import('../views/Widgets/Widgets'));
const Users = React.lazy(() => import('../views/Users/Users'));
const User = React.lazy(() => import('../views/Users/User'));
const SinglePage = React.lazy(() => import('../components/client/tours/singleTour/SingleTour'));
const Salo = React.lazy(() => import("../components/client/Salo"))
const TourWidget = React.lazy(() => import("../components/tours/index"))
const HotelAddWidget = React.lazy(() => import("../components/admin/addHotel"))
const RegionAddWidget = React.lazy(() => import("../components/admin/addRegion"))
const RegionDelWidget = React.lazy(() => import("../components/admin/delRegion"))
const CountryAddWidget = React.lazy(() => import("../components/admin/addCountry"))
const CountryDelWidget = React.lazy(() => import("../components/admin/delCountry"))
const CountryEditWidget = React.lazy(() => import("../components/admin/editCountry"))
const TourAddWidget = React.lazy(() => import("../components/admin/addTour"))
const PhotoHotelAddWidget = React.lazy(() => import("../components/admin/addPhotoHotel"))


const routes=[
  { path: '/admin/', exact: true, name: 'Home' },
  { path: '/admin/hoteladd', exact: true, name: 'Готель', component: HotelAddWidget},
  { path: '/admin/photohoteladd', exact: true, name: 'Фото додавання', component: PhotoHotelAddWidget},
  { path: '/admin/regionadd', exact: true, name: 'Регіон додавання', component: RegionAddWidget},
  { path: '/admin/regiondel', exact: true, name: 'Регіон видалення', component: RegionDelWidget},
  { path: '/admin/countryadd', exact: true, name: 'Країна додавання', component: CountryAddWidget},
  { path: '/admin/countrydel', exact: true, name: 'Країна видалення', component: CountryDelWidget},
  { path: '/admin/countryedit', exact: true, name: 'Країна редагування', component: CountryEditWidget},
  { path: '/admin/touradd', exact: true, name: 'Тур додавання', component: TourAddWidget},
  { path: '/admin/singlepage', exact: true, name: 'Готель', component: SinglePage },
  { path: '/admin/tours', exact: true, name: 'Тури', component: TourWidget },
  { path: "/admin/ss", exact: true, name: "ss", component: Salo },
  { path: '/admin/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/admin/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/admin/theme/colors', name: 'Colors', component: Colors },
  { path: '/admin/theme/typography', name: 'Typography', component: Typography },
  { path: '/admin/base', exact: true, name: 'Base', component: Cards },
  { path: '/admin/base/cards', name: 'Cards', component: Cards },
  { path: '/admin/base/forms', name: 'Forms', component: Forms },
  { path: '/admin/base/switches', name: 'Switches', component: Switches },
  { path: '/adminbase/tables', name: 'Tables', component: Tables },
  { path: '/admin/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/admin/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/admin/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/admin/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/admin/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/admin/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/admin/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/admin/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/admin/base/navs', name: 'Navs', component: Navs },
  { path: '/admin/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/admin/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/admin/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/admin/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/admin/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/admin/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/admin/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/admin/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/admin/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/admin/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/admin/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/admin/icons/flags', name: 'Flags', component: Flags },
  { path: '/admin/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/admin/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/admin/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/admin/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/admin/notifications/badges', name: 'Badges', component: Badges },
  { path: '/admin/notifications/modals', name: 'Modals', component: Modals },
  { path: '/admin/widgets', name: 'Widgets', component: Widgets },
  { path: '/admin/charts', name: 'Charts', component: Charts },
  { path: '/admin/users', exact: true, name: 'Users', component: Users },
  { path: '/admin/users/:id', exact: true, name: 'User Details', component: User },
];
export default routes;
