const  UserCard = ({ user }) => {
  const{ firstName, lastName,photoUrl,age,gender,about} = user;
    return(
        <div className="card bg-base-300 w-96 min-h-[690px] shadow-sm flex flex-col justify-between">
  <figure>
    <img
      src={user.photoUrl}
      alt="Photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender && <p> {age+" "+gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
    )
}

export default UserCard;