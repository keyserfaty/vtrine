import { createStore } from './helpers/store'
import { exists } from './helpers'
import { clientId, url } from './constants'

import Downloads from './components/Downloads'
import SearchBoxMain from './components/SearchBoxMain'
import SearchBoxHeader from './components/SearchBoxHeader'
import OnBoarding from './components/OnBoarding'

const dummyImages = [{"id":"_XvKr96TKFM","created_at":"2017-07-07T22:02:13-04:00","updated_at":"2017-07-08T15:39:12-04:00","width":2592,"height":1728,"color":"#D3C7AE","likes":50,"liked_by_user":false,"description":null,"user":{"id":"dG6lZyj-wvM","updated_at":"2017-07-08T15:43:36-04:00","username":"nate_dumlao","name":"Nathan Dumlao","first_name":"Nathan","last_name":"Dumlao","twitter_username":"Nate_Dumlao","portfolio_url":"http://www.nathandumlaophotos.com","bio":"Brand Consultant and Content Creator living in Los Angeles creating up the coast.","location":"Los Angeles","total_likes":37,"total_photos":57,"total_collections":1,"profile_image":{"small":"https://images.unsplash.com/profile-1495427732560-fe5248ad6638?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=8e6405920894a45ce9204dd11d1465f3","medium":"https://images.unsplash.com/profile-1495427732560-fe5248ad6638?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=1978e1f9440ee4cc1da03c318068593f","large":"https://images.unsplash.com/profile-1495427732560-fe5248ad6638?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=8f75defe3b90fd37243d80d207c8c6d6"},"links":{"self":"https://api.unsplash.com/users/nate_dumlao","html":"http://unsplash.com/@nate_dumlao","photos":"https://api.unsplash.com/users/nate_dumlao/photos","likes":"https://api.unsplash.com/users/nate_dumlao/likes","portfolio":"https://api.unsplash.com/users/nate_dumlao/portfolio","following":"https://api.unsplash.com/users/nate_dumlao/following","followers":"https://api.unsplash.com/users/nate_dumlao/followers"}},"current_user_collections":[],"urls":{"raw":"https://images.unsplash.com/photo-1499479061019-b5d178fc3a4c","full":"https://images.unsplash.com/photo-1499479061019-b5d178fc3a4c?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=77092f90b0c7b69813d5a4fcae020c3e","regular":"https://images.unsplash.com/photo-1499479061019-b5d178fc3a4c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=01f8a234829a5d7a32d5e90520d58509","small":"https://images.unsplash.com/photo-1499479061019-b5d178fc3a4c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=fd1a8c251223faa1368be103600b40db","thumb":"https://images.unsplash.com/photo-1499479061019-b5d178fc3a4c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=4edf808eedf06c5d1348cf255e6c1306"},"categories":[],"links":{"self":"https://api.unsplash.com/photos/_XvKr96TKFM","html":"http://unsplash.com/photos/_XvKr96TKFM","download":"http://unsplash.com/photos/_XvKr96TKFM/download","download_location":"https://api.unsplash.com/photos/_XvKr96TKFM/download"}},{"id":"cjpGSEkXfwM","created_at":"2017-07-07T22:58:39-04:00","updated_at":"2017-07-08T15:25:03-04:00","width":5766,"height":3844,"color":"#FFC57A","likes":61,"liked_by_user":false,"description":null,"user":{"id":"SX7B0pTAkLc","updated_at":"2017-07-08T15:25:03-04:00","username":"jasonhk1920","name":"Jason Wong","first_name":"Jason","last_name":"Wong","twitter_username":"JASONWHK","portfolio_url":"http://www.jasonpicture.com","bio":"","location":"HongKong","total_likes":22,"total_photos":20,"total_collections":4,"profile_image":{"small":"https://images.unsplash.com/profile-1498297060484-b14c06d38554?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=c372d1cbc8fd2e2893f14ebfd0da90e5","medium":"https://images.unsplash.com/profile-1498297060484-b14c06d38554?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=3459b20d8da1cc38547efda2f4394be1","large":"https://images.unsplash.com/profile-1498297060484-b14c06d38554?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=d86899dee895ddd33cf230078b0a8d14"},"links":{"self":"https://api.unsplash.com/users/jasonhk1920","html":"http://unsplash.com/@jasonhk1920","photos":"https://api.unsplash.com/users/jasonhk1920/photos","likes":"https://api.unsplash.com/users/jasonhk1920/likes","portfolio":"https://api.unsplash.com/users/jasonhk1920/portfolio","following":"https://api.unsplash.com/users/jasonhk1920/following","followers":"https://api.unsplash.com/users/jasonhk1920/followers"}},"current_user_collections":[],"urls":{"raw":"https://images.unsplash.com/photo-1499482624510-89fb8b6d0ded","full":"https://images.unsplash.com/photo-1499482624510-89fb8b6d0ded?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=261c280b4a68451b36a961027820f77c","regular":"https://images.unsplash.com/photo-1499482624510-89fb8b6d0ded?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=c54164f3e3736bafed72fa127438ae6b","small":"https://images.unsplash.com/photo-1499482624510-89fb8b6d0ded?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=5d0f7574e1610a6ad8b07055ee11c61a","thumb":"https://images.unsplash.com/photo-1499482624510-89fb8b6d0ded?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=ec7e9cf30ec56801f583d9bf0f9b1f01"},"categories":[],"links":{"self":"https://api.unsplash.com/photos/cjpGSEkXfwM","html":"http://unsplash.com/photos/cjpGSEkXfwM","download":"http://unsplash.com/photos/cjpGSEkXfwM/download","download_location":"https://api.unsplash.com/photos/cjpGSEkXfwM/download"}},{"id":"K6OkLvmUwo0","created_at":"2017-07-07T20:34:01-04:00","updated_at":"2017-07-08T15:32:34-04:00","width":3674,"height":5511,"color":"#EAE4DD","likes":51,"liked_by_user":false,"description":null,"user":{"id":"xMrSqWwB25M","updated_at":"2017-07-08T15:32:34-04:00","username":"luke92","name":"Luke Palmer","first_name":"Luke","last_name":"Palmer","twitter_username":null,"portfolio_url":null,"bio":"","location":null,"total_likes":0,"total_photos":8,"total_collections":0,"profile_image":{"small":"https://images.unsplash.com/profile-1499474457815-3364dc81ca7a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=6c392150844abe30190486aa03d4b9a6","medium":"https://images.unsplash.com/profile-1499474457815-3364dc81ca7a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=358d5318ead742f159b4725526f5dca5","large":"https://images.unsplash.com/profile-1499474457815-3364dc81ca7a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=03a8cda5849636c87375355db78c1393"},"links":{"self":"https://api.unsplash.com/users/luke92","html":"http://unsplash.com/@luke92","photos":"https://api.unsplash.com/users/luke92/photos","likes":"https://api.unsplash.com/users/luke92/likes","portfolio":"https://api.unsplash.com/users/luke92/portfolio","following":"https://api.unsplash.com/users/luke92/following","followers":"https://api.unsplash.com/users/luke92/followers"}},"current_user_collections":[],"urls":{"raw":"https://images.unsplash.com/photo-1499473983312-952b8160ad44","full":"https://images.unsplash.com/photo-1499473983312-952b8160ad44?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=888b6b056f8ac2d1e54562a0e17e012c","regular":"https://images.unsplash.com/photo-1499473983312-952b8160ad44?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=f88f2f0db29b968a2a4fb988d15c2629","small":"https://images.unsplash.com/photo-1499473983312-952b8160ad44?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=3c7d72751c5c1909731ac9e57a549205","thumb":"https://images.unsplash.com/photo-1499473983312-952b8160ad44?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=922840d48ac11a04067ea67be3fd26ff"},"categories":[],"links":{"self":"https://api.unsplash.com/photos/K6OkLvmUwo0","html":"http://unsplash.com/photos/K6OkLvmUwo0","download":"http://unsplash.com/photos/K6OkLvmUwo0/download","download_location":"https://api.unsplash.com/photos/K6OkLvmUwo0/download"}},{"id":"NjbsEkkvOwc","created_at":"2017-07-07T17:33:27-04:00","updated_at":"2017-07-08T15:41:14-04:00","width":5304,"height":7952,"color":"#D84118","likes":49,"liked_by_user":false,"description":null,"user":{"id":"UgiAn-KeGqE","updated_at":"2017-07-08T15:41:31-04:00","username":"joshuanewton","name":"Joshua Newton","first_name":"Joshua","last_name":"Newton","twitter_username":"JoshuaNewton1","portfolio_url":"https://www.instagram.com/joshuanewton1/","bio":"Product Designer & Photographer.\r\n\r\n“Edit your life frequently and ruthlessly. It's your masterpiece after all.” - Nathan W. Morris.","location":"London","total_likes":374,"total_photos":58,"total_collections":6,"profile_image":{"small":"https://images.unsplash.com/profile-1496509391479-789f8bda4d2c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=86818bc9f183b451160783b9066a1449","medium":"https://images.unsplash.com/profile-1496509391479-789f8bda4d2c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=043cba95f5b647c25c0cea45a3274131","large":"https://images.unsplash.com/profile-1496509391479-789f8bda4d2c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=ade70934773396e62dfd7cfeeec5030e"},"links":{"self":"https://api.unsplash.com/users/joshuanewton","html":"http://unsplash.com/@joshuanewton","photos":"https://api.unsplash.com/users/joshuanewton/photos","likes":"https://api.unsplash.com/users/joshuanewton/likes","portfolio":"https://api.unsplash.com/users/joshuanewton/portfolio","following":"https://api.unsplash.com/users/joshuanewton/following","followers":"https://api.unsplash.com/users/joshuanewton/followers"}},"current_user_collections":[],"urls":{"raw":"https://images.unsplash.com/photo-1499462994724-775b2edaf559","full":"https://images.unsplash.com/photo-1499462994724-775b2edaf559?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=67544db17451cc58d8cfbdcf1608c7fa","regular":"https://images.unsplash.com/photo-1499462994724-775b2edaf559?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=2c1e7ed0e501fed1eb61d7513f22556e","small":"https://images.unsplash.com/photo-1499462994724-775b2edaf559?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=1d8be099bbbc7faffa1909fd58157892","thumb":"https://images.unsplash.com/photo-1499462994724-775b2edaf559?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=7160513dd47edcd8c51989fb2f260c9c"},"categories":[],"links":{"self":"https://api.unsplash.com/photos/NjbsEkkvOwc","html":"http://unsplash.com/photos/NjbsEkkvOwc","download":"http://unsplash.com/photos/NjbsEkkvOwc/download","download_location":"https://api.unsplash.com/photos/NjbsEkkvOwc/download"}},{"id":"ACZWfGgza4E","created_at":"2017-07-07T23:33:29-04:00","updated_at":"2017-07-08T15:43:21-04:00","width":3992,"height":2992,"color":"#E1D5D6","likes":41,"liked_by_user":false,"description":null,"user":{"id":"v6U-IqzjkUQ","updated_at":"2017-07-08T15:43:21-04:00","username":"hansonlujx","name":"Hanson Lu","first_name":"Hanson","last_name":"Lu","twitter_username":null,"portfolio_url":"https://www.flickr.com/photos/hansonlu/","bio":"my journey\r\n","location":"singapore ","total_likes":0,"total_photos":18,"total_collections":0,"profile_image":{"small":"https://images.unsplash.com/profile-1495416311377-e38745b3c5c0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=90ea1963d683d1170cd8f6c715fd5481","medium":"https://images.unsplash.com/profile-1495416311377-e38745b3c5c0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=0edf0abb68ee7c518c0bf46b9ab3b5e7","large":"https://images.unsplash.com/profile-1495416311377-e38745b3c5c0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=c4cd3fbea1dd9ff7d80e845b3b238af2"},"links":{"self":"https://api.unsplash.com/users/hansonlujx","html":"http://unsplash.com/@hansonlujx","photos":"https://api.unsplash.com/users/hansonlujx/photos","likes":"https://api.unsplash.com/users/hansonlujx/likes","portfolio":"https://api.unsplash.com/users/hansonlujx/portfolio","following":"https://api.unsplash.com/users/hansonlujx/following","followers":"https://api.unsplash.com/users/hansonlujx/followers"}},"current_user_collections":[],"urls":{"raw":"https://images.unsplash.com/photo-1499484731615-c07151d86ff8","full":"https://images.unsplash.com/photo-1499484731615-c07151d86ff8?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=ec073fbd2b0f0720490a089228ed9895","regular":"https://images.unsplash.com/photo-1499484731615-c07151d86ff8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=ac090caf526bdd5ea786806124526373","small":"https://images.unsplash.com/photo-1499484731615-c07151d86ff8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=d9963d6da2ee97f74f0088e6adc3485f","thumb":"https://images.unsplash.com/photo-1499484731615-c07151d86ff8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=4099722daf1d4a1694af81ab7ee122e9"},"categories":[],"links":{"self":"https://api.unsplash.com/photos/ACZWfGgza4E","html":"http://unsplash.com/photos/ACZWfGgza4E","download":"http://unsplash.com/photos/ACZWfGgza4E/download","download_location":"https://api.unsplash.com/photos/ACZWfGgza4E/download"}},{"id":"6dmx8YnkPGo","created_at":"2017-07-07T22:49:31-04:00","updated_at":"2017-07-08T15:39:43-04:00","width":3840,"height":5760,"color":"#F6ECEF","likes":46,"liked_by_user":false,"description":null,"user":{"id":"dG6lZyj-wvM","updated_at":"2017-07-08T15:43:36-04:00","username":"nate_dumlao","name":"Nathan Dumlao","first_name":"Nathan","last_name":"Dumlao","twitter_username":"Nate_Dumlao","portfolio_url":"http://www.nathandumlaophotos.com","bio":"Brand Consultant and Content Creator living in Los Angeles creating up the coast.","location":"Los Angeles","total_likes":37,"total_photos":57,"total_collections":1,"profile_image":{"small":"https://images.unsplash.com/profile-1495427732560-fe5248ad6638?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=8e6405920894a45ce9204dd11d1465f3","medium":"https://images.unsplash.com/profile-1495427732560-fe5248ad6638?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=1978e1f9440ee4cc1da03c318068593f","large":"https://images.unsplash.com/profile-1495427732560-fe5248ad6638?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=8f75defe3b90fd37243d80d207c8c6d6"},"links":{"self":"https://api.unsplash.com/users/nate_dumlao","html":"http://unsplash.com/@nate_dumlao","photos":"https://api.unsplash.com/users/nate_dumlao/photos","likes":"https://api.unsplash.com/users/nate_dumlao/likes","portfolio":"https://api.unsplash.com/users/nate_dumlao/portfolio","following":"https://api.unsplash.com/users/nate_dumlao/following","followers":"https://api.unsplash.com/users/nate_dumlao/followers"}},"current_user_collections":[],"urls":{"raw":"https://images.unsplash.com/photo-1499482125586-91609c0b5fd4","full":"https://images.unsplash.com/photo-1499482125586-91609c0b5fd4?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=ad478f32f7ff424081cb221ae67ce060","regular":"https://images.unsplash.com/photo-1499482125586-91609c0b5fd4?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=7025f170c8ccc6e0170ec184473cced7","small":"https://images.unsplash.com/photo-1499482125586-91609c0b5fd4?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=5f9e1801b02ddfe00388b953ced3836f","thumb":"https://images.unsplash.com/photo-1499482125586-91609c0b5fd4?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=e46488024ef1d92e67f8dd064286fd09"},"categories":[],"links":{"self":"https://api.unsplash.com/photos/6dmx8YnkPGo","html":"http://unsplash.com/photos/6dmx8YnkPGo","download":"http://unsplash.com/photos/6dmx8YnkPGo/download","download_location":"https://api.unsplash.com/photos/6dmx8YnkPGo/download"}},{"id":"B77Jq93dh_M","created_at":"2017-07-08T01:47:42-04:00","updated_at":"2017-07-08T15:12:03-04:00","width":3200,"height":2400,"color":"#F6F6F6","likes":23,"liked_by_user":false,"description":null,"user":{"id":"Y82C5-SEUvo","updated_at":"2017-07-08T15:12:21-04:00","username":"jakedavies","name":"Jake Davies","first_name":"Jake","last_name":"Davies","twitter_username":"jakedavies","portfolio_url":"http://behance.net/jakedavies","bio":"Product Designer. Blackwork Tattoo Model. Black Evangelist.","location":"Kiev, Ukraine","total_likes":25,"total_photos":22,"total_collections":1,"profile_image":{"small":"https://images.unsplash.com/profile-1493514151784-3475021be2fd?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=42dd560174c20f6b701dd020281d0c10","medium":"https://images.unsplash.com/profile-1493514151784-3475021be2fd?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=b2e526314c7cf087be19ae1cba0c7a5b","large":"https://images.unsplash.com/profile-1493514151784-3475021be2fd?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=7298a34ea1192d41aed4ed040124cdf2"},"links":{"self":"https://api.unsplash.com/users/jakedavies","html":"http://unsplash.com/@jakedavies","photos":"https://api.unsplash.com/users/jakedavies/photos","likes":"https://api.unsplash.com/users/jakedavies/likes","portfolio":"https://api.unsplash.com/users/jakedavies/portfolio","following":"https://api.unsplash.com/users/jakedavies/following","followers":"https://api.unsplash.com/users/jakedavies/followers"}},"current_user_collections":[],"urls":{"raw":"https://images.unsplash.com/photo-1499492827719-e2cc9a2e0528","full":"https://images.unsplash.com/photo-1499492827719-e2cc9a2e0528?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=e2b6e5982a1a82e078db90cef5adb0df","regular":"https://images.unsplash.com/photo-1499492827719-e2cc9a2e0528?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=d8d9b795c940141ae270e83872d4e232","small":"https://images.unsplash.com/photo-1499492827719-e2cc9a2e0528?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=90baad1c106722a5eb842661a7a90b3d","thumb":"https://images.unsplash.com/photo-1499492827719-e2cc9a2e0528?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=0683868f35fa1f0448220eaeebba9501"},"categories":[],"links":{"self":"https://api.unsplash.com/photos/B77Jq93dh_M","html":"http://unsplash.com/photos/B77Jq93dh_M","download":"http://unsplash.com/photos/B77Jq93dh_M/download","download_location":"https://api.unsplash.com/photos/B77Jq93dh_M/download"}},{"id":"qXgs8u1vqnc","created_at":"2017-07-07T20:38:12-04:00","updated_at":"2017-07-08T15:23:40-04:00","width":5511,"height":3674,"color":"#F7F8F8","likes":37,"liked_by_user":false,"description":null,"user":{"id":"xMrSqWwB25M","updated_at":"2017-07-08T15:32:34-04:00","username":"luke92","name":"Luke Palmer","first_name":"Luke","last_name":"Palmer","twitter_username":null,"portfolio_url":null,"bio":"","location":null,"total_likes":0,"total_photos":8,"total_collections":0,"profile_image":{"small":"https://images.unsplash.com/profile-1499474457815-3364dc81ca7a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=6c392150844abe30190486aa03d4b9a6","medium":"https://images.unsplash.com/profile-1499474457815-3364dc81ca7a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=358d5318ead742f159b4725526f5dca5","large":"https://images.unsplash.com/profile-1499474457815-3364dc81ca7a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=03a8cda5849636c87375355db78c1393"},"links":{"self":"https://api.unsplash.com/users/luke92","html":"http://unsplash.com/@luke92","photos":"https://api.unsplash.com/users/luke92/photos","likes":"https://api.unsplash.com/users/luke92/likes","portfolio":"https://api.unsplash.com/users/luke92/portfolio","following":"https://api.unsplash.com/users/luke92/following","followers":"https://api.unsplash.com/users/luke92/followers"}},"current_user_collections":[],"urls":{"raw":"https://images.unsplash.com/photo-1499474244840-24167be9717d","full":"https://images.unsplash.com/photo-1499474244840-24167be9717d?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=35aa0ffb57afc0a379e8e4577e90c679","regular":"https://images.unsplash.com/photo-1499474244840-24167be9717d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=dd758990cb65c1a8093c875c8c5302ee","small":"https://images.unsplash.com/photo-1499474244840-24167be9717d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=68ce33fdfc3e606e8197658fe16a47ba","thumb":"https://images.unsplash.com/photo-1499474244840-24167be9717d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=afae095363cae9b58d24c9d081baa62d"},"categories":[],"links":{"self":"https://api.unsplash.com/photos/qXgs8u1vqnc","html":"http://unsplash.com/photos/qXgs8u1vqnc","download":"http://unsplash.com/photos/qXgs8u1vqnc/download","download_location":"https://api.unsplash.com/photos/qXgs8u1vqnc/download"}},{"id":"D7PHEsjBox8","created_at":"2017-07-07T19:15:44-04:00","updated_at":"2017-07-08T15:03:06-04:00","width":4032,"height":3024,"color":"#F2ECEC","likes":16,"liked_by_user":false,"description":null,"user":{"id":"F6BLXtVoK_U","updated_at":"2017-07-08T15:17:35-04:00","username":"aows","name":"adrian","first_name":"adrian","last_name":null,"twitter_username":"aows","portfolio_url":"http://aows.co","bio":"📸 Unsplash ambassador\r\n🌲 Exploring the PNW and beyond\r\n👉 Instagram/Twitter: @aows","location":"Portland, OR","total_likes":185,"total_photos":124,"total_collections":1,"profile_image":{"small":"https://images.unsplash.com/profile-1477425397965-75171a4aaddd?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=31f0f9662db1946e01aae3c0d15766d3","medium":"https://images.unsplash.com/profile-1477425397965-75171a4aaddd?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=02429e1c14de6f1d95e72a2842fc01bb","large":"https://images.unsplash.com/profile-1477425397965-75171a4aaddd?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=9a70d448584571db6e9d12dfab4bbcbe"},"links":{"self":"https://api.unsplash.com/users/aows","html":"http://unsplash.com/@aows","photos":"https://api.unsplash.com/users/aows/photos","likes":"https://api.unsplash.com/users/aows/likes","portfolio":"https://api.unsplash.com/users/aows/portfolio","following":"https://api.unsplash.com/users/aows/following","followers":"https://api.unsplash.com/users/aows/followers"}},"current_user_collections":[],"urls":{"raw":"https://images.unsplash.com/photo-1499469250-c12ca48a9db8","full":"https://images.unsplash.com/photo-1499469250-c12ca48a9db8?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=506dba555dc91d8ebbb2788c484c2e48","regular":"https://images.unsplash.com/photo-1499469250-c12ca48a9db8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=dc6736190dbe3b74a9598f7ce731ee64","small":"https://images.unsplash.com/photo-1499469250-c12ca48a9db8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=e706cb9276b862ddd47e9456c6a6a9f2","thumb":"https://images.unsplash.com/photo-1499469250-c12ca48a9db8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=b5e84f3470aa260dc7fc6c3a2563f2d1"},"categories":[],"links":{"self":"https://api.unsplash.com/photos/D7PHEsjBox8","html":"http://unsplash.com/photos/D7PHEsjBox8","download":"http://unsplash.com/photos/D7PHEsjBox8/download","download_location":"https://api.unsplash.com/photos/D7PHEsjBox8/download"}},{"id":"IRXYNAMlUtw","created_at":"2017-07-07T17:34:56-04:00","updated_at":"2017-07-08T15:41:24-04:00","width":7952,"height":5304,"color":"#D7DBE1","likes":16,"liked_by_user":false,"description":null,"user":{"id":"UgiAn-KeGqE","updated_at":"2017-07-08T15:41:31-04:00","username":"joshuanewton","name":"Joshua Newton","first_name":"Joshua","last_name":"Newton","twitter_username":"JoshuaNewton1","portfolio_url":"https://www.instagram.com/joshuanewton1/","bio":"Product Designer & Photographer.\r\n\r\n“Edit your life frequently and ruthlessly. It's your masterpiece after all.” - Nathan W. Morris.","location":"London","total_likes":374,"total_photos":58,"total_collections":6,"profile_image":{"small":"https://images.unsplash.com/profile-1496509391479-789f8bda4d2c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=86818bc9f183b451160783b9066a1449","medium":"https://images.unsplash.com/profile-1496509391479-789f8bda4d2c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=043cba95f5b647c25c0cea45a3274131","large":"https://images.unsplash.com/profile-1496509391479-789f8bda4d2c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=ade70934773396e62dfd7cfeeec5030e"},"links":{"self":"https://api.unsplash.com/users/joshuanewton","html":"http://unsplash.com/@joshuanewton","photos":"https://api.unsplash.com/users/joshuanewton/photos","likes":"https://api.unsplash.com/users/joshuanewton/likes","portfolio":"https://api.unsplash.com/users/joshuanewton/portfolio","following":"https://api.unsplash.com/users/joshuanewton/following","followers":"https://api.unsplash.com/users/joshuanewton/followers"}},"current_user_collections":[],"urls":{"raw":"https://images.unsplash.com/photo-1499463217683-ee3c9ce038f1","full":"https://images.unsplash.com/photo-1499463217683-ee3c9ce038f1?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=45888a9c7e9566ee394c8e1fa159f9ab","regular":"https://images.unsplash.com/photo-1499463217683-ee3c9ce038f1?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=528e41f92e190f8d708249d801b8d4e4","small":"https://images.unsplash.com/photo-1499463217683-ee3c9ce038f1?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=e581410426bb9c6d11456dddbca033cf","thumb":"https://images.unsplash.com/photo-1499463217683-ee3c9ce038f1?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=1d450f625f67a962e9c25ebe6931b494"},"categories":[],"links":{"self":"https://api.unsplash.com/photos/IRXYNAMlUtw","html":"http://unsplash.com/photos/IRXYNAMlUtw","download":"http://unsplash.com/photos/IRXYNAMlUtw/download","download_location":"https://api.unsplash.com/photos/IRXYNAMlUtw/download"}}]

export const d = document

// model
const initialState = {
  routes: {
    path: '/'
  },
  searchValue: '',
  displayDownloads: false,
  imagesQueue: ['./statics/images/1.jpg', './statics/images/1.jpg'],
  imagesList: [],
  currentImage: null,
  nextImage: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ON_INPUT_ENTER_KEY_DOWN': {
      return {
        ...state,
        searchValue: action.payload.searchValue,
        routes: {
          path: '/search'
        }
      }
    }

    case 'ON_TOGGLE_DOWNLOADS': {
      return {
        ...state,
        displayDownloads: !state.displayDownloads,
      }
    }

    case 'ON_CLEAR_ALL_DOWNLOADS': {
      return {
        ...state,
        imagesQueue: [],
      }
    }

    case 'ON_ADD_IMAGE_TO_QUEUE': {
      return {
        ...state,
        imagesQueue: [
          ...state.imagesQueue,
          ...action.payload.image
        ]
      }
    }

    case 'ON_REMOVE_IMAGE_FROM_QUEUE': {
      return {
        ...state,
        imagesQueue: state.imagesQueue
          .filter((image, i) => i !== Number(action.payload.id))
      }
    }

    case 'ON_NEW_IMAGES': {
      return {
        ...state,
        imagesList: action.payload.images,
        currentImage: action.payload.images[0],
        nextImage: action.payload.images[1]
      }
    }

    default:
      return state
  }
}

const store = createStore(reducer)

// view
const body = d.querySelector('body')
const header = d.querySelector('header')
const actions = header.querySelector('.actions')
const folder = header.querySelector('.downloads')
const single = body.querySelector('.single')

store.subscribe((state, action) => {
  const props = {
    dispatch: store.dispatch,
    ...state,
  }

  // route changes
  const searchBoxMainPreviousNode = d.querySelector('#search')
  const onBoardingNode = single.querySelector('#on-boarding')
  const searchBoxHeaderNode = header.querySelector('.search')

  if (state.routes.path === '/' && !exists(searchBoxMainPreviousNode)) {
    single.appendChild(SearchBoxMain(props))
  }

  if (state.routes.path !== '/' && exists(searchBoxMainPreviousNode)) {
    searchBoxMainPreviousNode.parentNode.removeChild(searchBoxMainPreviousNode)
  }

  const isFirstLoad = localStorage.getItem('first_load')

  if (state.routes.path === '/search' && !exists(searchBoxHeaderNode)) {
    header.insertBefore(SearchBoxHeader(props), actions)
  }

  if (state.routes.path === '/search' && !exists(onBoardingNode) && !exists(isFirstLoad)) {
    single.appendChild(OnBoarding(props))
    localStorage.setItem('first_load', false)
  }

    // imagesQueue changes
  const downloadPreviousNode = d.querySelector('#download')

  if (state.displayDownloads && exists(downloadPreviousNode)) {
    downloadPreviousNode.parentNode.removeChild(downloadPreviousNode)
    body.appendChild(Downloads(props))
  }

  // displayDownloads changes
  if (state.displayDownloads && !exists(downloadPreviousNode)) {
    body.appendChild(Downloads(props))
  }

  if (!state.displayDownloads && exists(downloadPreviousNode)) {
    downloadPreviousNode.parentNode.removeChild(downloadPreviousNode)
  }

  // imagesList changes
  if (exists(state.currentImage)) {
    single.setAttribute('style', 'background-image: url(' + state.currentImage.urls.small +')')
  }

  switch (action.type) {
    case 'ON_INPUT_ENTER_KEY_DOWN': {
      window.history.pushState('', '', 'search?q=' + state.searchValue)
      store.dispatch({ type: 'ON_FETCH_IMAGES' })
      break
    }

    case 'ON_FETCH_IMAGES': {
      //const xml = new XMLHttpRequest();

      //xml.addEventListener('load', function () {
          store.dispatch({
            type: 'ON_NEW_IMAGES',
            payload: {
              images: dummyImages
            }
          })
        //}
      //);
      //xml.open('GET', url + clientId);
      //xml.send();

      break
    }

    default:
      return false
  }
})

// events
window.addEventListener('load', () => {
  store.dispatch({ type: 'ON_WINDOW_LOAD' })
})

window.addEventListener('keyup', function (e) {
  if (e.keyCode === 32) {
    store.dispatch({
      type: 'ON_SPACE_BAR'
    })
  }
})

folder.addEventListener('click', () => {
  store.dispatch({ type: 'ON_TOGGLE_DOWNLOADS' })
})
