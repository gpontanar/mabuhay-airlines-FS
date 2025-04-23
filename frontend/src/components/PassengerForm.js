<form>
  <div className="mb-3">
    <label>Name</label>
    <input type="text" className="form-control" placeholder="John Doe" required />
  </div>
  <div className="mb-3">
    <label>Email</label>
    <input type="email" className="form-control" placeholder="email@example.com" required />
  </div>
  <div className="mb-3">
    <label>Number of Passengers</label>
    <input type="number" className="form-control" defaultValue={1} min={1} required />
  </div>
  <button type="submit" className="btn btn-success">Confirm Booking</button>
</form>
