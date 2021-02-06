import React from 'react'

function Hell() {
    const menu = this.props.hells.map((hell) => {
        return (
          <div  className="col-12 col-md-5 m-1">
            <card key={hell.Id}>
              <image width="100%" src={hell.Poster} alt={hell.Title} />

            </card>
          </div>
        );
    });
    return (
        <div>
            {menu}
        </div>
    )
}

export default Hell
