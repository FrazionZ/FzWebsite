import Badge from "./Badge";

import moment from 'moment-timezone'
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')

export default function CandidateComponentCardComment({ comment }){

    console.log(comment)

    return (
        <div className="card candidate comment">
            <div className="card-body">
                <div className="avatar">
                    <img src={`https://auth.frazionz.net/skins/face.php?u=${comment.uid}`} alt="avatar_user" />
                </div>
                <div className="infos">
                    <div className="user">
                        <span>{ comment.user.name }</span>
                        <Badge message={ comment.user.role.name } styleBadge={{ background: comment.user.role.color }} />
                    </div>
                    <div className="comment">
                        { comment.comment }
                    </div>
                </div>
            </div>
        </div>
    )

}