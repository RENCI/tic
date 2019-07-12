import React, { useContext } from 'react'
import { StoreContext } from '../../contexts/StoreContext'
import { Heading } from '../../components/Typography/Typography'
import ProposalsTable from '../../components/Tables/ProposalsTable'
import BrowseMenu from '../../components/Menus/BrowseMenu'

export const ProposalsListPage = (props) => {
    const [store, ] = useContext(StoreContext)

    return (
        <div>
            <Heading>
                Proposals <BrowseMenu />
            </Heading>
            
            <ProposalsTable proposals={ store.proposals } paging={ true } />
        </div>
    )
}