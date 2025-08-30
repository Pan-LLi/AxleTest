## Bug Fixes and Solutions

### Bug 1: New parts not saved to localStorage
**Issue:**  
Newly added parts were not persisted to `localStorage`, and errors were silently ignored, making debugging difficult.  

**Cause:**  
The `saveParts` function attempted to save a non-existent variable `part` instead of the correct array `parts`. Additionally, the `catch` block incorrectly invoked `resolve()` instead of propagating the error, which made failed saves appear successful.  

**Solution:**  
- Updated the function to serialize and save `parts` using `JSON.stringify(parts)`.  
- Modified the `catch` block to call `reject(error)` instead of `resolve()`, ensuring error handling works as intended.  

### Bug 2: Total inventory value calculated incorrectly
**Issue:**  
The displayed total inventory value only reflected the items on the current page, not the entire dataset.  

**Cause:**  
The calculation was scoped to the paginated subset of items (`currentPageParts`) rather than the full `parts` array.  

**Solution:**  
Moved the total calculation to `App.jsx`, where all inventory data is available, and passed the computed total as a prop to `PartList.jsx`. This ensures the displayed total represents the entire inventory.  

### Bug 3: Updated initial data not rendering
**Issue:**  
After updating the `INITIAL_PARTS` constant for testing, the new data did not appear in the UI.  

**Cause:**  
Previously saved inventory data persisted in `localStorage`, overriding the updated constant during initialization.  

**Solution:**  
Manually cleared stale storage with:  
```js
localStorage.removeItem('parts-inventory');
```

After clearing, the UI reloaded with the updated initial dataset.


### Bug 4: Misaligned inventory values  
**Issue:**  
“Current Page Inventory Value” and “Total Inventory Value” were rendered on the same line, negatively impacting readability.  

**Cause:**  
Both values were wrapped in the same container without proper block-level styling.  

**Solution:**  
Applied inline CSS `display: 'block'` to force each value onto a new line, improving layout and readability.  


### Bug 5: Delete function not asynchronous  
**Issue:**  
The delete function was originally synchronous, wgucg risks inconsistent state updates if asynchronous operations (like saving to `localStorage`) failed or lagged.  

**Cause:**  
The function directly updated state and storage without awaiting persistence.  

**Solution:**  
Changed the delete handler to be `async` and wrapped storage updates in `await`, aligning it with other async functions like `saveParts`, `handleSaveParts` and ensuring consistent state persistence.  


### Bug 6: Delete button had no effect  
**Issue:**  
Clicking the delete button did nothing.  

**Cause:**  
The `handleDeletePart` function was implemented in `App.tsx` but was neither passed down as a prop nor invoked by the child component responsible for rendering delete buttons.  

**Solution:**  
- Passed `handleDeletePart` from `App.tsx` to the subcomponent via props.  
- Added the appropriate `onClick` binding in the child component to ensure the function is executed when the delete button is clicked.  

## Detailed Description of New Features with Usage Instructions


### Feature 1: Deletion Functionality

**Description:**  
When the user clicks the **Delete** button, a `window.confirm` prompt appears to prevent accidental deletions. If confirmed:  
1. The part’s `id` is passed to `onDeletePart`.  
2. `onDeletePart` calls `handleDeletePart`.  
3. `handleDeletePart` filters out the matching `id` from the `parts` array.  
4. The updated list is persisted via `saveParts`.  
5. A success message confirms the deletion.  

**Usage:**  
1. Locate the part you want to delete in the table.  
2. Click the **Delete** button and confirm the prompt.  
3. The part will be removed, and the inventory will update automatically.  


### Feature 2: Pagination  
**Description:**  
Large inventories can now be browsed efficiently:  
- `itemsPerPage` determines how many items display per page (default = 5).  
- `currentPage` tracks the active page.  
- `PartList` only renders the slice of items corresponding to the current page.  

**Usage:**  
1. Scroll to the bottom of the inventory table to view pagination controls.  
2. The control displays the current page and total number of pages.  
3. Use **Next** and **Previous** buttons to navigate between pages.  

---

### Feature 3: Dynamic Sorting  
**Description:**  
A sorting dropdown is available at the top-left of the Part List.  
- Users can sort by **Name**, **Quantity**, or **Price**.  
- Sorting supports both **ascending** and **descending** order.  
- Default sort: **Price (ascending)**.  

**Usage:**  
1. Open the sort dropdown at the top-left of the Part List.  
2. Select an attribute (Name, Quantity, or Price).  
3. Toggle ascending/descending to reorder the list.  

---

### Feature 4: Audit Trail  
**Description:**  
Each part now automatically logs the date and time it was added.  
- A new column, **Added At**, displays this timestamp.  
- The timestamp is generated at insertion using the system’s current time.  
- On saving the inventory, the timestamp is stored along with other attributes (Name, Price, Quantity).  

**Usage:**  
1. Fill in the part details (Name, Price, Quantity).  
2. Click **Add Part**.  
3. Click **Save Inventory**.  
4. The **Added At** column will display the timestamp of when the part was created.  

### Update the "How to Run" section if needed
- N/A

### Add any new dependencies or setup requirements
- N/A

## Summary

### Overview of the Bug Fix and Debugging Process  
During development, I resolved several recurring issues:  
- Incorrect `localStorage` saving  
- Delete button not working  
- Totals only showing per page  
- Asynchronous delete logic  
- Inline CSS layout problems  

The debugging process typically fell into two categories:  
1. **Bugs within a single file** – These were simpler to fix, as they often involved identifying a small block of code (e.g., adjusting inline CSS to properly separate total values onto multiple lines).  
2. **Bugs involving multiple files/components** – These were more complex, as they required tracing data and function calls across components. In these cases, I used `console.log` to validate whether data was being passed correctly between parent and child components.  

For example, when debugging why the delete function did not work:  
- First, I verified that the function was imported into `App.tsx`.  
- Next, I confirmed that the function was correctly passed down as a prop to `PartList`.  
- Finally, I checked whether the child component properly invoked the function on button click.  
This step-by-step process isolated the issue and allowed me to implement the fix systematically.  


### Challenges and How I Overcame Them  
Since the project was built on starter code, integrating new features required careful alignment with existing structures. For example:  
- When adding an audit trail (date field), I had to update the `Part` interface in `types.ts` to include the new field.  
- In `PartForm`, I ensured the date field was omitted during form submission (similar to how `id` is handled) to prevent missing field errors.  
- In `PartList`, I added a new column header and corresponding table cell to render the date.  

Another important challenge was identifying **what could be reused** when developing new features. Instead of duplicating logic or styles, I reviewed existing:  
- **Functions** (e.g., `saveParts`, `handleDeletePart`) that could be adapted for new functionality.  
- **Defined CSS tags** or inline styles that could be applied consistently.  
- **Variables and constants** (e.g., `INITIAL_PARTS`, pagination configs) that could be extended instead of redefined.  

The main challenge overall was ensuring that every new variable or feature integrated seamlessly with the original codebase without breaking existing functionality. I overcame this by following existing design patterns, reusing code wherever possible, and verifying that new fields were properly declared, passed, and rendered.  



### Assumptions  
To maintain scalability and modularity, I refactored the codebase so that larger features were separated into dedicated components/files:  
- Sorting logic and UI controls → `SortControls.tsx`  
- Pagination logic and UI controls → `Pagination.tsx`  

Additional assumptions and design decisions:  
- **Totals**: Since page totals alone are not realistic for most use cases, I introduced a `grandTotal` variable in `App.tsx` and passed it to `PartList`. This allows both **current page total** and **overall inventory total** to be displayed.  
- **Sorting**: Although the requirements did not specify ascending/descending sorting, I implemented both to provide flexibility.  
- **Pagination demo data**: Because the default dataset was too small to demonstrate pagination effectively, I added additional seed data.  

### Next Steps to Improve the Application  
There are several enhancements that could significantly improve functionality:  

1. **Database Integration**  
   - Connect to a persistent backend (e.g., MongoDB) so data is not only saved locally but also accessible across multiple devices.  

2. **User Authentication & Authorization**  
   - Implement role-based access control (RBAC).  
   - Example: Some users may have **read-only** access, while others can fully manage (add/delete/update) inventory data.  

3. **Edit Functionality**  
   - Add an edit feature to correct errors in fields such as `price`, `quantity`, or `name`.  

4. **Filtering & Search**  
   - Enable users to filter inventory by criteria such as:  
     - Price range  
     - Date added  
     - Specific part name  
   - This would improve discoverability and usability for larger datasets.  
