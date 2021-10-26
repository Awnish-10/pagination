import React, { useState, useEffect } from 'react';
import _ from 'lodash';

function Data() {
	const [page, setPage] = useState(2);
	const [data, setData] = useState([]);
	const pageData = {
		page: 2,
		perPage: 1,
		totalPages: 1,
	};
	const APICall = async () => {
		const link = `https://reqres.in/api/users?page=${page}`;
		const res = await fetch(link);
		const data = await res.json();
		setData(data.data);
		pageData.page = data.page;
		pageData.perPage = data.per_page;
		pageData.totalPage = data.total_pages;
	};

	useEffect(() => {
		APICall();
	}, [page]);
	const clickHandler = (item) => {
		setPage(item);
	};
	const pages = _.range(1, pageData.totalPages + 2);
	return (
		<div>
			<table className='table'>
				<thead>
					<tr>
						<th>Id</th>
						<th>Email</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>avatar</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => {
						return (
							<tr key={item.id}>
								<td>{item.id}</td>
								<td>{item.email}</td>
								<td>{item.first_name}</td>
								<td>{item.last_name}</td>
								<td>
									<img alt='' src={item.avatar}></img>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<nav className='d-flex justify-content-center'>
				<ul className='pagination '>
					{pages.map((item) => {
						return (
							<li
								className='page-link'
								onClick={() => {
									clickHandler(item);
								}}
							>
								{item}
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
}

export default Data;
