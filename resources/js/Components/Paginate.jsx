import { usePage } from "@inertiajs/react";

export default function Paginate({ layout, labelType, routeName, parent_id, pagination, setList, setPagination }) {

    const props = usePage().props

    let pages = [];
    let index = pagination?.current_page;
    let calcTotalBtn = (5 + pagination?.current_page > pagination?.last_page) ? pagination?.last_page : 5 + pagination?.current_page > pagination?.last_page;
    if (pagination?.last_page < 6) {
        index = 1
        calcTotalBtn = pagination?.last_page
    } else if (!calcTotalBtn)
        calcTotalBtn = 5 + pagination?.current_page
    for (var i = index; i <= calcTotalBtn; i++)
        pages.push({ dp: i })

    async function changePage(action) {
        let result = null
        if (typeof action == "string") {
            if (action == "prev")
                result = pagination?.current_page - 1
            else if (action == "first")
                result = 1
            else if (action == "next")
                result = pagination?.current_page + 1
            else if (action == "last")
                result = pagination?.last_page
        } else
            result = action
            refreshList(result)
    }

    async function refreshList(page) {
        setList(null)
        axios.post(route(routeName), {
            parent_id: parent_id,
            page: page,
            _token: props.csrf_token
        })
        .then((res) => {
            let resultPagination = res.data
            setList(resultPagination.data)
            setPagination(resultPagination)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            {pagination?.last_page >= 2 &&
                <div className={`paginate ${layout == "top" ? "reverse" : ""}`}>
                    <span>Page {pagination?.current_page}/{pagination?.last_page} - {pagination?.total} {(labelType !== undefined) ? labelType : ""}</span>
                    <div className="actions">
                        {pagination?.last_page >= 3 &&
                            <button className="btn" onClick={() => { changePage('first') }} disabled={pagination?.prev_page_url == null || pagination.data == null}>{`<<`}</button>
                        }
                        <button className="btn" onClick={() => { changePage('prev') }} disabled={pagination?.prev_page_url == null || pagination.data == null}>{`<`}</button>
                        {pages?.map((btn, index) => {
                            return <button key={index} onClick={() => { changePage(btn.dp) }} className="btn" disabled={btn.dp == pagination?.current_page || pagination.data == null} >{btn.dp}</button>
                        })}
                        <button className="btn" onClick={() => { changePage('next') }} disabled={pagination?.next_page_url == null || pagination.data == null}>{`>`}</button>
                        {pagination?.last_page >= 3 &&
                            <button className="btn" onClick={() => { changePage('last') }} disabled={pagination?.next_page_url == null || pagination.data == null}>{`>>`}</button>
                        }
                    </div>
                </div>
            }
        </>

    )

}