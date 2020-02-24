import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Login from '../auth/Login'
import Register from '../auth/Register'
import ForgotPassword from '../auth/ForgotPassword'
import ResetPassword from '../auth/ResetPassword'
import UserAccount from '../auth/UserAccount'
import UserAccountPassword from '../auth/UserAccountPassword'

import Dashboard from '../dashboard/Dashboard'
import Alert from '../layout/Alert'
import PrivateRoute from '../routing/PrivateRoute'
import PrivateAdminRoute from '../routing/PrivateAdminRoute'

import CreateProfile from '../profile-form/CreateProfile'
import EditProfile from '../profile-form/EditProfile'
import EditProfilePic from '../profile-form/EditProfilePic'

import AddGoal from '../profile-form/AddGoal'
import AddStats from '../profile-form/AddStats'

import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
// import About from '../about/About'
import NotFound from '../layout/NotFound'
import Contact from '../contact/Contact'

/* Admin packages*/
import Users from '../admin-users/Users';
import AdminPackages from '../admin-packages/Packages';
import AdminPackagesSessions from '../admin-sessions/Session';
import AdminPackageAddSession from '../admin-sessions/AddSession';
import AdminPackageAddPackage from '../admin-package-form/AddPackage';
import AdminEditPackage from '../admin-package-form/EditPackage';

/* Admin single sessions*/
import AdminSessions from '../admin-single-session/Session';
import AdminAddSession from '../admin-single-session/AddSession';


import AdminManageProfile from '../admin-manage-profile/admin-profile/Profile'
import AdminAddGoal from '../admin-manage-profile/admin-profile-form/AddGoal'
import AdminEditGoal from '../admin-manage-profile/admin-profile-form/EditGoal'
import AdminAddStats from '../admin-manage-profile/admin-profile-form/AddStats'

/* Booking */
import BookingForm from '../booking-form/BookingForm'
import Packages from '../dashboard/packages/Packages'
import Sessions from '../dashboard/sessions/Session'
import SingleSessions from '../dashboard/single-sessions/Session'

/* Booking Manage*/
import BookingManage from '../booking-manage/BookingManage'

/*Admin Booking */
import AdminCalendarManageBooking from '../admin-calendar-booking/CalendarManageBooking'
import ManageBookingClient from '../admin-calendar-booking/ManageBookingClient'
import AdminUpdateSession from '../admin-move-booking-to-sessions/UpdateSession'


const Routes = () => {

    return (
        <section className="container">
            <Alert />
            <Switch>
                <Route path='/login' exact component={Login} />
                <PrivateAdminRoute path='/register' exact component={Register} />
                <Route path='/forgot-password' exact component={ForgotPassword} />
                <Route path='/reset-password/:id' exact component={ResetPassword} />
                <PrivateRoute path='/user-account' exact component={UserAccount} />
                <PrivateRoute path='/user-account-password' exact component={UserAccountPassword} />


                <PrivateAdminRoute path='/admin' exact component={Users} />
                <PrivateAdminRoute path='/admin-manage-booking' exact component={AdminCalendarManageBooking} />
                <PrivateAdminRoute path='/manage-booking-client' exact component={ManageBookingClient} />

                <PrivateAdminRoute path='/admin-packages/:id' exact component={AdminPackages} />
                <PrivateAdminRoute path='/admin-add-package/' exact component={AdminPackageAddPackage} />
                <PrivateAdminRoute path='/admin-edit-package/:id' exact component={AdminEditPackage} />
                <PrivateAdminRoute path='/admin-package-sessions/:id' exact component={AdminPackagesSessions} />
                <PrivateAdminRoute path='/admin-package-add-session/:id' exact component={AdminPackageAddSession} />
                <PrivateAdminRoute path='/admin-update-session' exact component={AdminUpdateSession} />


                <PrivateAdminRoute path='/admin-single-sessions/:id' exact component={AdminSessions} />
                <PrivateAdminRoute path='/admin-add-single-session/:id' exact component={AdminAddSession} />


                <PrivateAdminRoute path='/admin-user-profile/:id' exact component={AdminManageProfile} />
                <PrivateAdminRoute path='/admin-add-goal/:id' exact component={AdminAddGoal} />
                <PrivateAdminRoute path='/admin-edit-goal/:id' exact component={AdminEditGoal} />
                <PrivateAdminRoute path='/admin-add-stats/:id' exact component={AdminAddStats} />


                <PrivateRoute path='/dashboard' exact component={Dashboard} />
                <PrivateRoute path='/packages' exact component={Packages} />
                <PrivateRoute path='/sessions/:id' exact component={Sessions} />
                <PrivateRoute path='/single-sessions/' exact component={SingleSessions} />
                <PrivateRoute path='/create-profile' exact component={CreateProfile} />
                <PrivateRoute path='/edit-profile' exact component={EditProfile} />
                <PrivateRoute path='/edit-profile-pic' exact component={EditProfilePic} />
                <PrivateRoute path='/add-goal' exact component={AddGoal} />
                <PrivateRoute path='/add-stats' exact component={AddStats} />

                <PrivateRoute path='/booking' exact component={BookingForm} />
                <PrivateRoute path='/manage-booking' exact component={BookingManage} />

                <PrivateRoute path='/profiles' exact component={Profiles} />
                <PrivateRoute path='/profile/:id' exact component={Profile} />

                <Route path='/contact' exact component={Contact} />
                <PrivateRoute path='/posts' exact component={Posts} />
                <PrivateRoute path='/posts/:id' exact component={Post} />
                <PrivateRoute path='/document' exact component={NotFound} />

                <Route component={NotFound} />
            </Switch>
        </section>
    )
}

Routes.propTypes = {

}

export default Routes
