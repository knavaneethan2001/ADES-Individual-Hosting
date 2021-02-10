$(document).ready(function () {
    var count = 1;
    $('#btnAddTracker').click(function () {
        // inserts red remove button for component, company ID input and search button, queue ID drop down
        // and hide inactive checkbox
        $('#tracker').append($(`
            <li class='flex-item col-sm-12 col-md-12 col-lg-6 '>
                <div class="row mb-2">
                    <div class="removeTracker">
                        <button type="button" id="btnRemoveTracker${count}" class="btnRemoveTracker btn btn-light float-end">X</button>
                    </div>
                </div>
                <div class="row mx-2 mb-4">

                    
                    <form id="searchCompany${count}" class="row searchCompany">
                        <div class="col-md-3">
                            <label for="inputSearchCompany" class="col-form-label">Company ID</label>
                        </div>
                        <div class="col-md-6">
                            <input type="text" id="inputSearchCompany${count}" class="input-container form-control mb-2" name="inputSearchCompany">
                            <div id ="error${count}" class = "error"></div>
                        </div>
                        <div class="col-md-3">
                            <input type="submit" id="btnSearchCompany${count}" class="btn btn-light" value="SEARCH">
                        </div>
                        <div class="loader-search" id="loader-search${count}" style = "padding: 10px">
                        </div>
                    </form>
                </div>
                <div class="row mx-2 mb-5 searchQueue">
                    <form class="row">
                    <div class="col-md-3">
                            <label for='dropdownQueues' class='col-form-label'>Queue ID</label>
                        </div>
                        <div class="col-md-6">
                            <select id='dropdownQueues${count}' class='form-select' name='dropdownQueues'>
                            </select>
                        </div>
                        <div class="col-md-3 d-flex  justify-content-center">
                            <label for='cbHideInactive' class="col-form-label">Hide Inactive</label>
                            <input type='checkbox' id='cbHideInactive${count}' class="col-form-control checkbox-m cb" name='cbHideInactive' value='Hide  Inactive' checked = 'true'>
                        </div>
                    </form>
                </div>
                <div class="graph">
                    <div id="loader${count}" class="lcontainer" style="display:none">
                        <div class="loader-graph"></div>
                    </div>
                    <div id="error-graph${count}" class="error" style="visibility:hidden"></div>
                    <canvas id="chart${count}" width="800" height="450"></canvas>
                </div>
                    
                
            </li>
        `));
        
        $(this).insertAfter($('[class^="flex-item"]').last());
        count++;
    });

    
});

$(document).ready(function () {
    
});

